import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import EmailForm from './EmailForm';
import DropDown from './DropDown';
import BulkEmail from './BulkEmail';

const StyledPaper = styled(Paper)`
  margin-top: 20px !important;
`;
export default function EmailList() {
  const [options, setOptions] = useState({
    currentTab: 'email',
    snackBar: '',
    backdrop: false,
  });
  return (
    <div>
      <StyledPaper variant="outlined">
        <Tabs
          variant="scrollable"
          value={options.currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => setOptions({ ...options, currentTab: newValue })}
        >
          <Tab label="Email" value="email" />
          <Tab label="Mail List" value="mailList" />
          {/* <Tab label="Mail" value="mail" /> */}
        </Tabs>
      </StyledPaper>
      {options.currentTab === 'email' && (
        <Paper variant="outlined" className="px-2">
          <EmailForm />
        </Paper>
      )}
      {options.currentTab === 'mailList' && (
        <Paper variant="outlined" className="px-2">
          <DropDown />
        </Paper>
      )}
    </div>
  );
}
