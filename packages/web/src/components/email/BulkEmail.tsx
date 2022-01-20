import React from 'react';

import { useGetForm } from '@frontend/shared/hooks/form/getForm';
import BulkUploadAction from '../form2/BulkUploadAction';
import ErrorLoading from '../common/ErrorLoading';
import LoadingBar from '../common/LoadingBar';

interface IProps {
  _id?: string;
}

export default function BulkEmail({ _id = '61923541cf37760009083376' }: IProps) {
  const { data, error, loading } = useGetForm(_id);
  console.log('data', data.getForm);
  if (loading) {
    <LoadingBar />;
  }
  if (error || !data || !data?.getForm) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      <BulkUploadAction form={data?.getForm} />
    </div>
  );
}
