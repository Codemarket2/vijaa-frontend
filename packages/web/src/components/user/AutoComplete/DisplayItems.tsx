import AutoCompleteInput from './AutoCompleteInput';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import CRUDMenu from '../../common/CRUDMenu';
import { Grid, IconButton, Button } from '@material-ui/core';

interface IProps {
  index: any;
  handleDelete: any;
  data: any;
  handleUpdateInput: any;
  item: any;
}

export default function DisplayItems({
  index,
  handleDelete,
  data,
  handleUpdateInput,
  item,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editForm, setEditForm] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setEditForm(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditInput = (setValue) => {
    setValue(null);
    setEditForm(false);
  };

  return (
    <div>
      {!editForm && (
        <>
          <Grid container>
            <Grid item lg={11} md={11} sm={11} xs={11}>
              <h6>{item.title}</h6>
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1}>
              <IconButton onClick={handleClick}>
                <MoreHorizIcon />
              </IconButton>
              <CRUDMenu
                onClose={handleClose}
                onEdit={() => handleEdit()}
                onDelete={() => handleDelete(index)}
                show={anchorEl}
              />
            </Grid>
          </Grid>
        </>
      )}
      {editForm && (
        <div style={{ marginBottom: 20 }}>
          <AutoCompleteInput
            data={data}
            editForm={editForm}
            editInputValue={item}
            handleSave={handleUpdateInput(item, setEditForm)}
            handleCancel={handleEditInput}
          />
        </div>
      )}
    </div>
  );
}
