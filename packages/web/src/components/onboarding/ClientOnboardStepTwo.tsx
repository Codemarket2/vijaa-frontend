import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

interface IProps {
  handleSubscribe: (subscriptionType: string) => void;
}

export default function ClientOnboardStepTwo({ handleSubscribe }: IProps) {
  return (
    <div>
      <Typography color="primary" variant="h1" align="center">
      Here we go.
      </Typography>
      <List component="div" className="text-center mt-3">
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Unlock the full Drreamz experience" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Manage your entire business in one place" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Grow your community and collaboration" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Develop & launch new programs" />
        </ListItem>
      </List>
      <div className="text-center mt-5">
        <Button
          className="w-75"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleSubscribe('annual')}>
          Explore Drreamz
        </Button>
      </div>
    </div>
  );
}
