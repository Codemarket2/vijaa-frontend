import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Container, Paper, IconButton, Divider, Grid, Typography, Chip } from '@material-ui/core';
import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import styled from 'styled-components';

import CRUDMenu from '../../common/CRUDMenu';
import ChipInput from '../ChipInput';

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

const StyledChipContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

export default function ChipComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [display, setDisplay] = useState(false);
  const [holdState, setHoldState] = useState(true);
  const [value, setValue] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setDisplay(!display);
  };
  const handleSymptoms = (symptom) => {
    setValue(symptom);
  };
  const handleSubmit = () => {
    setDisplay(!display);
    setHoldState(false);
  };

  if (value === null || value.length === 0 || (value.length <= 10 && holdState) || display) {
    return (
      <>
        <StyledGridContainer container>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <ChipInput onChange={handleSymptoms} />
          </Grid>
          <StyledIconGrid item xs={3} sm={2} md={1} lg={1}>
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
      <StyledH6>Symptoms</StyledH6>
      <StyledIconGrid2 container>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <StyledChipContainer>
            {value.map((symptom) => (
              <div key={symptom}>
                <Chip label={symptom} />
              </div>
            ))}
          </StyledChipContainer>
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
