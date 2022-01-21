import * as yup from 'yup';
import { useFormik } from 'formik';
import { CREATE_CONTACT } from '../../graphql/mutation/contact';
import { useMutation } from '@apollo/client';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  title: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  businessName: yup.string(),
  mailingListName: yup.string().required('Mailing List Name is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().email('Invalid Email').required('Email is required'),
  extraField: yup.array().of(
    yup.object({
      fieldName: yup.string(),
      fieldValue: yup.string(),
    }),
  ),
});

interface IFormValues {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  mailingListName: string;
  extraField: [{ fieldName: string; fieldValue: string }];
}

const defaultFormValues = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  mailingListName: '',
  extraField: [{ fieldName: '', fieldValue: '' }],
};

export function useContactForm(): any {
  const [createContact, { data, loading, error }] = useMutation(CREATE_CONTACT);

  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        console.log('payload', payload);
        await createContact({
          variables: payload,
        });
        formik.handleReset('');
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const setFormValues = (form) => {
    formik.setFieldValue('title', form.title, false);
    formik.setFieldValue('firstName', form.firstName, false);
    formik.setFieldValue('lastName', form.lastName, false);
    formik.setFieldValue('email', form.email, false);
    formik.setFieldValue('phone', form.phone, false);
    formik.setFieldValue('businessName', form.businessName, false);
    formik.setFieldValue('mailingListName', form.mailingListName, false);
  };

  const formLoading = loading || formik.isSubmitting;
  return { formik, formLoading, setFormValues };
}
