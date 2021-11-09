import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GET_FIELDS_BY_TYPE } from '../../graphql/query/field';
import { client as apolloClient } from '../../graphql';
import {
  CREATE_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  UPDATE_FIELD_POSITION,
} from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';
import { ADDED_FIELD } from '../../graphql/subscription/field';

const defaultQueryVariables = { limit: 1000, page: 1 };

export function useGetFieldsByType({ parentId }: any) {
  const { data, error, loading, subscribeToMore } = useQuery(GET_FIELDS_BY_TYPE, {
    variables: { ...defaultQueryVariables, parentId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    subscribeToMore({
      document: ADDED_FIELD,
      variables: {
        parentId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newField = subscriptionData.data.addedField;
        let newData = { ...prev.getFieldsByType };
        const isUpdated = prev.getFieldsByType._id === newField._id;
        newData = isUpdated ? newField : newData;
        return {
          ...prev,
          getFieldsByType: {
            ...prev.getFieldsByType,
            data: newData,
          },
        };
      },
    });
  }, [data]);

  return { data, error, loading };
}

const validationSchema = yup.object({
  label: yup.string().required('Label is required'),
  fieldType: yup.string().required('Select Field Type'),
  typeId: yup.object().when('fieldType', {
    is: (value) => value === 'type',
    then: yup.object().nullable(true).required('Type is required'),
    otherwise: yup.object().nullable(true),
  }),
});

interface IFormValues {
  _id: string;
  edit: boolean;
  parentId: string;
  label: string;
  fieldType: string;
  typeId: any;
  multipleValues: boolean;
  oneUserMultipleValues: boolean;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  parentId: '',
  label: '',
  fieldType: '',
  typeId: null,
  multipleValues: false,
  oneUserMultipleValues: false,
};

interface ICRUDProps extends IHooksProps {
  parentId: any;
  createCallback: () => void;
}

export function useCRUDFields({ onAlert, parentId, createCallback }: ICRUDProps) {
  const [createFieldMutation, { loading: createLoading }] = useMutation(CREATE_FIELD);
  const [updateFieldMutation, { loading: updateLoading }] = useMutation(UPDATE_FIELD);

  const formik = useFormik({
    initialValues: { ...defaultFormValues, parentId },
    validationSchema: validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        let newPayload = payload;
        if (newPayload.typeId && newPayload.typeId._id) {
          newPayload = { ...newPayload, typeId: newPayload.typeId._id };
        }
        if (newPayload.edit) {
          const updateRes = await onUpdate(newPayload);
          console.log('updateRes', updateRes);
        } else {
          await onCreate(newPayload);
        }
        createCallback();
        formik.handleReset('');
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const onCreate = async (payload) => {
    const updateCache = (client, mutationResult) => {
      const { getFieldsByType } = client.readQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
      });
      const newData = {
        getFieldsByType: {
          ...getFieldsByType,
          data: [...getFieldsByType.data, mutationResult.data.createField],
        },
      };
      client.writeQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
        data: newData,
      });
    };
    return await createFieldMutation({
      variables: payload,
      update: updateCache,
    });
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const { getFieldsByType } = client.readQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
      });
      const newData = {
        getFieldsByType: {
          ...getFieldsByType,
          data: getFieldsByType.data.map((f) =>
            f._id === mutationResult.data.updateField._id ? mutationResult.data.updateField : f,
          ),
        },
      };
      client.writeQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
        data: newData,
      });
    };
    return await updateFieldMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const setFormValues = (field) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('label', field.label, false);
    formik.setFieldValue('fieldType', field.fieldType, false);
    formik.setFieldValue('multipleValues', field.multipleValues, false);
    formik.setFieldValue('oneUserMultipleValues', field.oneUserMultipleValues, false);
    formik.setFieldValue('typeId', field.typeId, false);
    formik.setFieldValue('_id', field._id, false);
  };

  const formLoading = createLoading || updateLoading || formik.isSubmitting;

  return { formik, formLoading, setFormValues };
}

interface IDeleteProps extends IHooksProps {
  parentId: any;
}

export function useUpdateFieldPosition({ onAlert, parentId }: IDeleteProps) {
  const [updateFieldPositionMutation, { loading: updateLoading }] = useMutation(
    UPDATE_FIELD_POSITION,
  );
  const updatePositionInCache = async (newFields) => {
    const { getFieldsByType } = await apolloClient.readQuery({
      query: GET_FIELDS_BY_TYPE,
      variables: { ...defaultQueryVariables, parentId },
    });
    const newData = {
      getFieldsByType: {
        ...getFieldsByType,
        data: newFields,
      },
    };
    apolloClient.writeQuery({
      query: GET_FIELDS_BY_TYPE,
      variables: { ...defaultQueryVariables, parentId },
      data: newData,
    });
  };

  const handleUpdatePosition = async (_id: any, position: number) => {
    try {
      const res = await updateFieldPositionMutation({
        variables: { _id, position },
      });
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleUpdatePosition, updateLoading, updatePositionInCache };
}

export function useDeleteField({ onAlert, parentId }: IDeleteProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD);
  const handleDelete = async (_id: any, deleteCallBack: any) => {
    try {
      const deleteInCache = (client) => {
        const { getFieldsByType } = client.readQuery({
          query: GET_FIELDS_BY_TYPE,
          variables: { ...defaultQueryVariables, parentId },
        });
        const newData = {
          getFieldsByType: {
            ...getFieldsByType,
            data: getFieldsByType.data.filter((f) => f._id !== _id),
          },
        };
        client.writeQuery({
          query: GET_FIELDS_BY_TYPE,
          variables: { ...defaultQueryVariables, parentId },
          data: newData,
        });
      };
      await deleteFieldMutation({
        variables: { _id },
        update: deleteInCache,
      });
      deleteCallBack();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
