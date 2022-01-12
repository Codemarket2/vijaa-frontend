import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputGroup from '../common/InputGroup';
import { Button } from '@material-ui/core';

interface IProps {
  fields: any[];
  fileData: any[];
}

export default function BulkUploadForm({ fields, fileData }: IProps) {
  const [selected, setSelected] = useState({});
  const options = Object.keys(fileData[0]);
  const handleSubmit = () => {
    console.log('Maped Data ');
    console.log(selected);
  };
  return (
    <form className="px-2 my-2">
      <InputGroup>
        <Typography variant="h6" className="d-flex align-items-center pl-2">
          Variables
        </Typography>

        {fields.map((field, i) => (
          <div className="d-flex align-items-center my-3" key={i}>
            <TextField
              fullWidth
              className="mr-2"
              label="Name"
              variant="outlined"
              name="name"
              size="small"
              value={field.label}
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
              <Select
                labelId="variablefield-simple-select-outlined-label"
                id="variablefield-simple-select-outlined"
                name="value"
                value={selected[field.lable]}
                onChange={({ target }) => {
                  setSelected({ ...selected, [field.label]: target.value });
                }}
                label="Field"
              >
                {options?.map((keys, i) => (
                  <MenuItem key={i} value={keys}>
                    {keys}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </InputGroup>
      <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
        Review And Submit
      </Button>
    </form>
  );
}
