import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Grid, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import produce from 'immer';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';

import AutoCompleteInput from './AutoCompleteInput';
import CRUDMenu from '../../common/CRUDMenu';
import {
  StyledDisplayText,
  StyledGridContainer,
  StyledH5,
  StyledIconDiv,
  StyledIconGrid,
  StyledIconGrid2,
} from '../../../utils/CustomStyledComponents';

interface IPrpos {
  data: any;
  label: string;
  title: string;
}

export default function AutoComplete({
  data = [{ title: 'test 1' }, { title: 'test 2' }],
  label = 'add label',
  title = 'demo',
}: IPrpos) {
  const [showForm, setShowForm] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [value, setValue] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleCancelForm = () => {
    setShowForm(!showForm);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (index) => {
    setValue(
      produce(value, (draft) => {
        draft.splice(index, 1);
      }),
    );
  };
  const handleEdit = () => {
    // setShowForm(!showForm);
    // setDisplayData(!displayData);
  };

  const handleShowFormInput = () => {
    setShowForm(true);
    setDisplayData(false);
  };
  const handleSumbit = () => {
    setShowForm(false);
    setDisplayData(true);
  };

  console.log('value');
  console.log(value);

  return (
    <>
      <StyledH5>{title}</StyledH5>
      <StyledIconDiv>
        <AddBoxOutlinedIcon onClick={handleShowFormInput} />
        <h6 style={{ marginLeft: 5, fontWeight: 'bold' }}>Add {title}</h6>
      </StyledIconDiv>
      {showForm && (
        <StyledGridContainer container>
          <Grid item xs={9} sm={10} md={11} lg={11}>
            <AutoCompleteInput label={label} data={data} setValue={setValue} value={value} />
          </Grid>
          <StyledIconGrid item xs={3} sm={2} md={1} lg={1}>
            <IconButton onClick={handleCancelForm}>
              <CancelIcon color="secondary" />
            </IconButton>
            <IconButton onClick={handleSumbit}>
              <SaveIcon color="primary" />
            </IconButton>
          </StyledIconGrid>
        </StyledGridContainer>
      )}

      {displayData && (
        <>
          {value.map((item, index) => (
            <>
              <StyledIconGrid2 container key={index}>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  {/* <StyledDisplayText>{item.title && item.title}</StyledDisplayText> */}
                  <h6>{item.title && item.title}</h6>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <IconButton onClick={handleClick}>
                    <MoreHorizIcon />
                  </IconButton>
                  <CRUDMenu
                    onClose={handleClose}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(index)}
                    show={anchorEl}
                  />
                </Grid>
              </StyledIconGrid2>
            </>
          ))}
        </>
      )}
    </>
  );
}
