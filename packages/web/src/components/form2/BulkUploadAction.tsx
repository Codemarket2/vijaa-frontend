import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import CRUDMenu from '../common/CRUDMenu';
import { Button } from '@material-ui/core';

import * as XLSX from 'xlsx';
import BulkUploadForm from './BulkUploadForm';

interface IProps {
  form: any;
  onChange: any;
}

const initialState = {
  showForm: false,
  selectedIndex: null,
  selectedItem: null,
  showMenu: null,
  fileData: [],
};

export default function BulkUploadAction({ form, onChange }: IProps) {
  const [state, setState] = useState(initialState);
  const [files, setFiles] = useState([]);

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  state?.fileData?.map((e) => console.log(e));
  const changeHandler = (event) => {
    handleFileUpload(event);
    const { files } = event.target;
    let allFiles = [];
    for (let i = 0; i < files.length; i++) {
      allFiles.push(files[i]);
    }
    setSelectedFile(allFiles);
    setIsFilePicked(true);
  };

  // process CSV and xls data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    setFiles(list);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws);
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      setState({ ...state, fileData: files });
      // setSelectedFile([]);
      // setIsFilePicked(false);
    } else setState(initialState);
  };

  const onSave = (payload, operation) => {
    let newActions = form?.settings?.actions || [];
    if (operation === 'update') {
      // Update
      newActions = newActions?.map((a, i) => (i === state.selectedIndex ? payload : a));
    } else {
      // Create
      newActions = [...newActions, payload];
    }
    onChange(newActions);
    setState(initialState);
  };

  return (
    <>
      <Typography variant="h5" className="d-flex align-items-center pl-2">
        File Upload ( .xlsx, .csv, .xls)
        {!state.showForm && (
          <Tooltip title="Add File Upload Action">
            <IconButton color="primary" onClick={() => setState({ ...state, showForm: true })}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      {state.showForm && (
        <div style={{ margin: '35px', padding: '15px' }}>
          <input
            accept=".csv,.xlsx,.xls"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              Select File
            </Button>
          </label>
          {isFilePicked ? (
            selectedFile?.map((File, i) => (
              <div key={i} style={{ padding: '25px' }}>
                <h3>File {i + 1}</h3>
                <p>Filename: {File?.name}</p>
                <p>Filetype: {File?.type}</p>
                <p>Size in bytes: {File?.size}</p>
                <p>lastModifiedDate: {File?.lastModifiedDate.toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>Select a file to show details</p>
          )}
          {isFilePicked && selectedFile && (
            <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
              {selectedFile.length > 1 ? 'Upload Files' : 'Upload File'}
            </Button>
          )}
        </div>
      )}
      {state?.fileData?.length > 0 && (
        <BulkUploadForm fields={form?.fields} fileData={state.fileData} />
      )}
    </>
  );
}
