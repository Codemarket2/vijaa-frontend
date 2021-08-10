import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import styled from 'styled-components';

import AutoCompleteInput from './AutoCompleteInput';
import CRUDMenu from '../../common/CRUDMenu';

const StyledH6 = styled.h6`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledGridContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

const StyledIconGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

const StyledIconGrid2 = styled(Grid)`
  display: flex;
  align-items: center !important;
  padding: 2%;
`;

interface IPrpos {
  addtitle: string;
  data: any;
  label: string;
}

export default function AutoComplete({
  addtitle = 'demo',
  data = [{ test: 'test 1' }, { test: 'test 2' }],
  label = 'add label',
}: IPrpos) {
  const [showForm, setShowForm] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const generateKey = (option: any, setOption?: string) => {
    const getKeys = Object.keys(option);
    let keyS = getKeys[0];
    if (setOption === 'getDataKey') {
      return keyS;
    } else {
      return option[keyS];
    }
  };

  const handleCancelForm = () => {
    setShowForm(!showForm);
    // setDisplayData(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setShowForm(!showForm);
    setDisplayData(!displayData);
  };
  const handleSumbit = () => {
    setShowForm(!showForm);
    setDisplayData(!displayData);
  };

  if (value === null || showForm) {
    return (
      <>
        <StyledH6>{addtitle}</StyledH6>
        <StyledGridContainer container>
          <Grid item xs={9} sm={10} md={11} lg={11}>
            <AutoCompleteInput
              label={label}
              data={data}
              setValue={setValue}
              value={value}
              generateKey={generateKey}
            />
          </Grid>
          <StyledIconGrid item xs={3} sm={2} md={1} lg={1}>
            {showForm && (
              <IconButton onClick={handleCancelForm}>
                <CancelIcon color="secondary" />
              </IconButton>
            )}
            <IconButton onClick={handleSumbit}>
              <SaveIcon color="primary" />
            </IconButton>
          </StyledIconGrid>
        </StyledGridContainer>
      </>
    );
  }

  return (
    <>
      <StyledH6>{addtitle}</StyledH6>
      <StyledIconGrid2 container>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <p style={{ fontSize: 16 }}>
            {value[generateKey(value, 'getDataKey')] && value[generateKey(value, 'getDataKey')]}
          </p>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <CRUDMenu
            onClose={handleClose}
            onEdit={handleEdit}
            onDelete={() => console.log('object')}
            show={anchorEl}
          />
        </Grid>
      </StyledIconGrid2>
    </>
  );
}
