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

  return (
    <StyledPaper variant="outlined">
      <form className="px-2" onSubmit={formik.handleSubmit}>
        <MultipleEmails formik={formik} />
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
    </StyledPaper>
  );
}
