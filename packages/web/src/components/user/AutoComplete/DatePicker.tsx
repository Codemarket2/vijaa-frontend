import { Button, Container, Grid, IconButton } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';

import CRUDMenu from '../../common/CRUDMenu';
import { formatDate } from '@frontend/shared/config/dateFilter';
import {
  StyledDisplayText,
  StyledGridContainer,
  StyledH5,
  StyledIconGrid,
  StyledIconGrid2,
} from '../../../utils/CustomStyledComponents';

export default function DatePicker() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dateOfDiagnose, setDateOfDiagnose] = useState(null);
  const [display, setDisplay] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDateChange = (date: Date | null) => {
    setDateOfDiagnose(date);
  };
  const handleEdit = () => {
    setDisplay(!display);
  };
  const handleSubmit = () => {
    setDisplay(!display);
  };

  if (dateOfDiagnose === null || display) {
    return (
      <>
        <StyledGridContainer container>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="dialog"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select Date of Diagnose"
                fullWidth
                value={dateOfDiagnose}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'Date of Diagnose ',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <StyledIconGrid item xs={1} sm={1} md={1} lg={1}>
            <IconButton onClick={handleSubmit}>
              <SaveIcon color="primary" />
            </IconButton>
          </StyledIconGrid>
        </StyledGridContainer>
      </>
    );
  }

  return (
    <>
      {!display && (
        <>
          <StyledH5>Date of Diagnose</StyledH5>
          <StyledIconGrid2 container>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <StyledDisplayText>{formatDate(dateOfDiagnose)}</StyledDisplayText>
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
      )}
    </>
  );
}
