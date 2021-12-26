import { useUpdateForm } from '@frontend/shared/hooks/form';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { Button, Modal, Typography } from '@material-ui/core';
import { useState } from 'react';
import { onAlert } from '../../utils/alert';
import ErrorLoading from '../common/ErrorLoading';
import ResponseList from './ResponseList';

interface IProps {
  formId: any;
}

export default function ResponseCount({ formId }: IProps): any {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, error, loading } = useGetResponses(formId);
  const { state } = useUpdateForm({
    onAlert,
    _id: formId,
  });
  if (error || !data || loading) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {data?.getResponses?.count && (
        <Button
          variant="outlined"
          onClick={handleOpen}
        >{`${data?.getResponses?.count} Response`}</Button>
      )}
      {state && !error && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ResponseList form={state} />
          </Modal>
        </>
      )}
    </>
  );
}
