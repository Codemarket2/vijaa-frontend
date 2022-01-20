import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

import { useSendEmail } from '@frontend/shared/hooks/email/sendEmail';
import InputGroup from '../common/InputGroup';
import RichTextarea from '../common/RichTextarea2';
import LoadingButton from '../common/LoadingButton';
import MultipleEmails from '../common/MultipleEmails';

const StyledPaper = styled(Paper)`
  margin-top: 20px !important;
`;

export default function EmailForm() {
  const { formik, formLoading } = useSendEmail();
  const [state, setState] = useState({
    value: '',
    receiverEmail: [],
    error: null,
    resetEmails: true,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    setState({
      value: '',
      receiverEmail: [],
      error: null,
      resetEmails: false,
    });
  };
  return (
    // <StyledPaper variant="outlined">
    <form className="px-2" onSubmit={handleSubmit}>
      <InputGroup>
        <TextField
          fullWidth
          label="From"
          variant="outlined"
          name="senderEmail"
          size="small"
          type="email"
          placeholder="Enter your Email Address"
          value={formik.values.senderEmail}
          onChange={formik.handleChange}
          error={formik.touched.senderEmail && Boolean(formik.errors.senderEmail)}
          helperText={formik.touched.senderEmail && formik.errors.senderEmail}
        />
      </InputGroup>
      <MultipleEmails formik={formik} state={state} setState={setState} />
      <InputGroup>
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          name="subject"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Email Body</InputLabel>
        <RichTextarea
          value={formik.values.body}
          onChange={(newValue) => formik.setFieldValue('body', newValue)}
        />
      </InputGroup>
      <InputGroup>
        <LoadingButton type="submit" size="small" loading={formLoading}>
          Send
        </LoadingButton>
      </InputGroup>
    </form>
    // </StyledPaper>
  );
}
