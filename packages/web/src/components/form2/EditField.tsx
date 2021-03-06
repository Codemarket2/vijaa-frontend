/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputGroup from '../common/InputGroup';
import { getFormFieldTypes } from './fieldTypes';
import SelectListType from './SelectListType';
import InlineInput from '../common/InlineInput';
import SelectForm from './SelectForm';
import SelectFormFields from './SelectFormFields';
import RichTextarea from '../common/RichTextarea2';

type TProps = {
  field: any;
  onFieldChange: (newValue: any) => void;
  onClose: () => void;
  isSection?: boolean;
};

export default function FormFields({
  onFieldChange,
  field,
  onClose,
  isSection = false,
}: TProps): any {
  const onOptionChange = (updatedOption) => {
    onFieldChange({ ...field, options: { ...field.options, ...updatedOption } });
  };

  return (
    <>
      <Typography variant="h5" className="d-flex align-items-center">
        <Tooltip title="Go Back">
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <InlineInput
          placeholder="Field Label"
          value={field.label}
          onChange={(e) => onFieldChange({ ...field, label: e.target.value })}
        />
      </Typography>
      <Divider />
      <div className="px-3">
        <InputGroup>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="fieldType-simple-select-outlined-label">Field Type</InputLabel>
            <Select
              labelId="fieldType-simple-select-outlined-label"
              id="fieldType-simple-select-outlined"
              name="fieldType"
              value={field.fieldType}
              onChange={(e) => onFieldChange({ ...field, fieldType: e.target.value })}
              label="Field Type"
            >
              {getFormFieldTypes(isSection)?.map((option, index) => (
                <MenuItem value={option.value} key={index}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputGroup>
        {/* {field.fieldType === 'form' && (
          <InputGroup>
            <SelectForm
              value={field.form}
              onChange={(newValue) =>
                onFieldChange({
                  ...field,
                  form: newValue,
                  options: { ...field.options, formField: '' },
                })
              }
              error={!field.form}
              helperText={!field.form && 'required'}
            />
          </InputGroup>
        )} */}
        {!['label', 'form'].includes(field.fieldType) && (
          <>
            <InputGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.required}
                    onChange={({ target }) => onOptionChange({ required: target.checked })}
                    name="required"
                    color="primary"
                  />
                }
                label="Required"
              />
            </InputGroup>
            <InputGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.multipleValues}
                    onChange={({ target }) => onOptionChange({ multipleValues: target.checked })}
                    name="multipleValues"
                    color="primary"
                  />
                }
                label="Mutiple values"
              />
            </InputGroup>
            <InputGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.allowOtherUsers}
                    onChange={({ target }) => onOptionChange({ allowOtherUsers: target.checked })}
                    name="allowOtherUsers"
                    color="primary"
                  />
                }
                label="Allow other users can add value"
              />
            </InputGroup>
          </>
        )}
        {field.fieldType === 'label' && (
          <RichTextarea
            value={field.options.staticText}
            onChange={(val) => onOptionChange({ staticText: val })}
          />
        )}
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.showCommentBox}
                onChange={({ target }) => onOptionChange({ showCommentBox: target.checked })}
                name="showCommentBox"
                color="primary"
              />
            }
            label="Show CommentBox"
          />
        </InputGroup>
        {field.fieldType === 'select' && (
          <>
            <InputGroup>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel id="fieldType-simple-select-outlined-label">
                  Options list type
                </InputLabel>
                <Select
                  labelId="fieldType-simple-select-outlined-label"
                  id="fieldType-simple-select-outlined"
                  name="fieldType"
                  value={field?.options?.optionsListType}
                  defaultValue="text"
                  onChange={({ target }) => onOptionChange({ optionsListType: target.value })}
                  label="Options list type"
                >
                  {optionsListTypes?.map((option, index) => (
                    <MenuItem key={index} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
            {!['type', 'existingForm'].includes(field?.options?.optionsListType) && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.showAsCheckbox}
                    onChange={({ target }) => onOptionChange({ showAsCheckbox: target.checked })}
                    name="showAsCheckbox"
                    color="primary"
                  />
                }
                label="Display options as checkbox"
              />
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={field?.options?.selectAllowCreate}
                  onChange={({ target }) => onOptionChange({ selectAllowCreate: target.checked })}
                  name="selectAllowCreate"
                  color="primary"
                />
              }
              label="Allow user to create new option"
            />
            <InputGroup>
              {field?.options?.optionsListType === 'type' ? (
                <SelectListType
                  value={field.typeId}
                  onChange={(newValue) => onFieldChange({ ...field, typeId: newValue })}
                  error={!field.typeId}
                  helperText={!field.typeId && 'Required'}
                />
              ) : field?.options?.optionsListType === 'existingForm' ? (
                <>
                  <SelectForm
                    value={field.form}
                    onChange={(newValue) =>
                      onFieldChange({
                        ...field,
                        form: newValue,
                        options: { ...field.options, formField: '' },
                      })
                    }
                    error={!field.form}
                    helperText={!field.form && 'required'}
                  />
                  {field.form && (
                    <div className="mt-3">
                      <SelectFormFields
                        formId={field.form?._id}
                        value={field?.options?.formField}
                        onChange={(newValue) => onOptionChange({ formField: newValue })}
                        error={!field?.options?.formField}
                        helperText={!field?.options?.formField && 'required'}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <FormLabel>
                    Select Options
                    <Tooltip title="Add New Option">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onOptionChange({
                            selectOptions: field?.options?.selectOptions
                              ? [...field?.options?.selectOptions, '']
                              : [''],
                          })
                        }
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                  </FormLabel>
                  {field?.options?.selectOptions?.map((option, index) => (
                    <FormControl
                      variant="outlined"
                      fullWidth
                      size="small"
                      key={index}
                      className="mt-2"
                    >
                      <InputLabel htmlFor={`outlined-adornment-${index + 1}`}>
                        Option {index + 1}
                      </InputLabel>
                      <OutlinedInput
                        id={`outlined-adornment-${index + 1}`}
                        type="text"
                        value={option}
                        onChange={({ target }) =>
                          onOptionChange({
                            selectOptions: field?.options?.selectOptions?.map((m, i) =>
                              i === index ? target.value : m,
                            ),
                          })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                onOptionChange({
                                  selectOptions: field?.options?.selectOptions?.filter(
                                    (m, i) => i !== index,
                                  ),
                                })
                              }
                              edge="end"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={65}
                      />
                    </FormControl>
                  ))}
                </>
              )}
            </InputGroup>
          </>
        )}
      </div>
    </>
  );
}

const optionsListTypes = [
  { label: 'Text', value: 'text' },
  { label: 'Existing Type', value: 'type' },
  { label: 'Existing Form', value: 'existingForm' },
];
