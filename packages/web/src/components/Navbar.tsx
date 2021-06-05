import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CustomIcon from './CustomIcon';
import DateRangeIcon from '@material-ui/icons/DateRange';
import GroupIcon from '@material-ui/icons/Group';
import InboxIcon from '@material-ui/icons/Inbox';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
  nav: {},
}));

const StyledHeader = styled(Typography)`
  flex-grow: 1;
  color: #4a148c;
  font-weight: 700;
  letter-spacing: 1.5;
  font-size: 29px;
`;

const StyledNav = styled(AppBar)`
  background-color: #fff !important;
  box-shadow: 0px 2px 4px #61616133; 0px 1px 2px #61616133; 
  height: 77;
  display: flex;
  justify-content: center;
`;

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledNav position="absolute" className={classes.nav}>
        <Toolbar>
          <StyledHeader variant="h6">Drreamz</StyledHeader>
          <div className="d-none d-md-block">
            <IconButton>
              <InboxIcon />
            </IconButton>
            <IconButton>
              <DateRangeIcon />
            </IconButton>
            <IconButton>
              <LocalOfferIcon />
            </IconButton>
            <CustomIcon path="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12.88,17.76V19h-1.75v-1.29 c-0.74-0.18-2.39-0.77-3.02-2.96l1.65-0.67c0.06,0.22,0.58,2.09,2.4,2.09c0.93,0,1.98-0.48,1.98-1.61c0-0.96-0.7-1.46-2.28-2.03 c-1.1-0.39-3.35-1.03-3.35-3.31c0-0.1,0.01-2.4,2.62-2.96V5h1.75v1.24c1.84,0.32,2.51,1.79,2.66,2.23l-1.58,0.67 c-0.11-0.35-0.59-1.34-1.9-1.34c-0.7,0-1.81,0.37-1.81,1.39c0,0.95,0.86,1.31,2.64,1.9c2.4,0.83,3.01,2.05,3.01,3.45 C15.9,17.17,13.4,17.67,12.88,17.76z" />
            <IconButton>
              <GroupIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </div>
        </Toolbar>
      </StyledNav>
    </div>
  );
}
