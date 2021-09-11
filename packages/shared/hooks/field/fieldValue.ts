import { useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';
import { GET_FIELD_VALUES_BY_FIELD } from '../../graphql/query/field';
import {
  CREATE_FIELD_VALUE,
  UPDATE_FIELD_VALUE,
  DELETE_FIELD_VALUE,
} from '../../graphql/mutation/field';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

const defaultQueryVariables = { limit: 1000, page: 1 };

export function useGetFieldValuesByItem({ parentId, field }: any) {
  const { data, error, loading } = useQuery(GET_FIELD_VALUES_BY_FIELD, {
    variables: { ...defaultQueryVariables, parentId, field },
    fetchPolicy: 'cache-and-network',
  });
  // console.log('data, error, loading', data, error, loading);
  return { data, error, loading };
}

const validationSchema = yup.object({
  fieldType: yup.string(),
  itemId: yup.object().when('fieldType', {
    is: (value) => value === 'type',
    then: yup.object().nullable(true).required('Required'),
    otherwise: yup.object().nullable(true),
  }),
  value: yup.string().when('fieldType', {
    is: (value) => value !== 'type' && value !== 'media',
    then: yup.string().nullable(true).required('Required'),
    otherwise: yup.string().nullable(true),
  }),
  media: yup.array().when(['fieldType', 'tempMedia'], {
    is: (fieldType, tempMedia) => fieldType === 'media' && tempMedia.length === 0,
    then: yup.array().min(1, 'Select atleast one media'),
    otherwise: yup.array(),
  }),
});

interface IFormValues {
  _id: string;
  edit: boolean;
  fieldType: string;
  parentId: string;
  field: string;
  value: string;
  media: any;
  tempMedia: any;
  tempMediaFiles: any;
  itemId: any;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  fieldType: 'string',
  parentId: '',
  field: '',
  value: '',
  media: [],
  tempMedia: [],
  tempMediaFiles: [],
  itemId: null,
};

interface ICRUDProps extends IHooksProps {
  parentId: string;
  field: string;
  fieldType: string;
  createCallback: () => void;
}

export function useCRUDFieldValue({
  onAlert,
  parentId,
  field,
  fieldType,
  createCallback,
}: ICRUDProps) {
  const [createFieldValueMutation, { loading: createLoading }] = useMutation(CREATE_FIELD_VALUE);
  const [updateFieldValueMutation, { loading: updateLoading }] = useMutation(UPDATE_FIELD_VALUE);

  const queryVariables = { ...defaultQueryVariables, parentId, field };

  const formik = useFormik({
    initialValues: { ...defaultFormValues, parentId, field, fieldType },
    validationSchema: validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        let newPayload = { ...payload };
        if (newPayload.itemId && newPayload.itemId._id) {
          newPayload = { ...newPayload, itemId: newPayload.itemId._id };
        }
        let newMedia = [];
        if (newPayload.tempMediaFiles.length > 0) {
          newMedia = await fileUpload(newPayload.tempMediaFiles, '/field-values');
          newMedia = newMedia.map((n, i) => ({ url: n, caption: newPayload.tempMedia[i].caption }));
        }
        let media = [...newPayload.media, ...newMedia];
        media = media.map((m) => JSON.parse(JSON.stringify(m), omitTypename));
        newPayload = { ...newPayload, media };
        if (payload.edit) {
          await onUpdate(newPayload);
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
      const { getFieldValuesByItem } = client.readQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: queryVariables,
      });
      const newData = {
        getFieldValuesByItem: {
          ...getFieldValuesByItem,
          data: [...getFieldValuesByItem.data, mutationResult.data.createFieldValue],
        },
      };
      client.writeQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: queryVariables,
        data: newData,
      });
    };
    return await createFieldValueMutation({
      variables: payload,
      update: updateCache,
    });
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const { getFieldValuesByItem } = client.readQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: queryVariables,
      });
      const newData = {
        getFieldValuesByItem: {
          ...getFieldValuesByItem,
          data: getFieldValuesByItem.data.map((f) =>
            f._id === mutationResult.data.updateFieldValue._id
              ? mutationResult.data.updateFieldValue
              : f,
          ),
        },
      };
      client.writeQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: queryVariables,
        data: newData,
      });
    };
    return await updateFieldValueMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const setFormValues = (fieldValue) => {
    formik.setFieldValue('value', fieldValue.value, false);
    formik.setFieldValue('_id', fieldValue._id, false);
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('parentId', fieldValue.parentId, false);
    formik.setFieldValue('field', fieldValue.field, false);
    formik.setFieldValue('media', fieldValue.media, false);
    formik.setFieldValue('itemId', fieldValue.itemId, false);
  };

  const setMediaState = (state) => {
    formik.setFieldValue('media', state.media);
    formik.setFieldValue('tempMedia', state.tempMedia);
    formik.setFieldValue('tempMediaFiles', state.tempMediaFiles);
  };

  const mediaState = {
    media: formik.values.media,
    tempMedia: formik.values.tempMedia,
    tempMediaFiles: formik.values.tempMediaFiles,
  };

  const formLoading = createLoading || updateLoading || formik.isSubmitting;

  return { formik, formLoading, setFormValues, mediaState, setMediaState };
}

interface IDeleteProps extends IHooksProps {
  parentId: string;
  field: string;
}

export function useDeleteFieldValue({ onAlert, parentId, field }: IDeleteProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD_VALUE);
  const queryVariables = { ...defaultQueryVariables, parentId, field };
  const handleDelete = async (_id: any, deleteCallBack: any) => {
    try {
      const deleteInCache = (client) => {
        const { getFieldValuesByItem } = client.readQuery({
          query: GET_FIELD_VALUES_BY_FIELD,
          variables: queryVariables,
        });
        const newData = {
          getFieldValuesByItem: {
            ...getFieldValuesByItem,
            data: getFieldValuesByItem.data.filter((f) => f._id !== _id),
          },
        };
        client.writeQuery({
          query: GET_FIELD_VALUES_BY_FIELD,
          variables: queryVariables,
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
