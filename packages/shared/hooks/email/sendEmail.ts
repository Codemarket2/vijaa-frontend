import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';
import { generateObjectId } from '../../utils/objectId';

const validationSchema = yup.object({
  emails: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.split(/[\s,]+/) : [];
    })
    .of(yup.string().email(({ value }) => `${value} is not a valid email`)),
  subject: yup.string().required('Subject is required'),
  body: yup.string().required('Body cannot be empty'),
});

interface IFormValues {
  emails: any;
  subject: string;
  body: string;
}

const defaultFormValues = {
  emails: [],
  subject: '',
  body: '',
};

const onSave = (payload) => {
  console.log('payload', payload);
};

export function useSendEmail(): any {
  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        const newPayload = {
          emails: payload.emails,
          subject: payload.subject,
          body: payload.body,
        };
        formik.handleReset('');
        onSave(newPayload);
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  const setFormValues = (form) => {
    formik.setFieldValue('subject', form.subject, false);
    formik.setFieldValue('body', form.body, false);
    formik.setFieldValue('emails', form.emails, false);
  };
  const formLoading = formik.isSubmitting;
  return { formik, formLoading, setFormValues };
}
