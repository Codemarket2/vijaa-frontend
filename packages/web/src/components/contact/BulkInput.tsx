import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Button from '@material-ui/core/Button';

const initialState = {
  showForm: false,
  fileUrl: null,
  fileData: [],
};

export default function BulkInput() {
  const [state, setState] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [map, setMap] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    console.log('state', state);
    console.log('files', files);
    console.log('map', map);
    console.log('selectedFile', selectedFile);
    console.log('isFilePicked', isFilePicked);
  }, [files, state, map, selectedFile, isFilePicked]);

  const resetStates = () => {
    setState(initialState);
    setFiles([]);
    setMap({});
    setSelectedFile([]);
    setIsFilePicked(false);
  };
  const changeHandler = (event) => {
    const { files } = event.target;
    files && handleFileUpload(event);
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
    setFiles(headers);
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

  const mapDataToField = () => {
    if (selectedFile) {
      setState({ ...state, fileData: files });
    } else setState(initialState);
  };

  return (
    <div>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          name="upload"
          id="raised-button-file"
          onChange={changeHandler}
        />
      </form>
      {isFilePicked ? (
        selectedFile?.map((File, i) => (
          <div key={i} style={{ padding: '25px' }}>
            <h3>File {i + 1}</h3>
            <p>Filename: {File?.name}</p>
            <p>Filetype: {File?.type}</p>
            <p>Size in bytes: {File?.size}</p>
            {File?.lastModifiedDate && (
              <p>lastModifiedDate: {File?.lastModifiedDate.toLocaleDateString()}</p>
            )}
          </div>
        ))
      ) : (
        <p>Select a file to show details</p>
      )}
      {isFilePicked && selectedFile && (
        <Button variant="contained" color="primary" component="span" onClick={mapDataToField}>
          {selectedFile.length > 1 ? 'Upload Files' : 'Map Fields'}
        </Button>
      )}
    </div>
  );
}
