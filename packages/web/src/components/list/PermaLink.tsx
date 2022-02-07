import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';

interface IProps {
  label: string;
  fieldName: string;
  onCancel: () => void;
  multiline?: boolean;
  formik: any;
  formLoading?: boolean;
}

export default function PermaLink({
  label = 'Value',
  onCancel,
  formik,
  fieldName,
  formLoading = false,
}: IProps) {
  const router = useRouter();
  return (
    <div>
      <h4>{window.location.href}</h4>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          {
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name={fieldName}
              label={label}
              disabled={formik.isSubmitting}
              value={formik?.values[fieldName]?.includes('-n-e-w') ? '' : formik?.values[fieldName]}
              onChange={formik?.handleChange}
              error={formik?.touched[fieldName] && Boolean(formik?.errors[fieldName])}
              helperText={formik?.touched[fieldName] && formik?.errors[fieldName]}
            />
          }
        </InputGroup>
        <InputGroup>
          <LoadingButton type="submit" loading={formLoading} size="small">
            Save
          </LoadingButton>
          <Button
            className="ml-2"
            disabled={formLoading}
            variant="outlined"
            size="small"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}
