import { AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CallEndIcon from '@material-ui/icons/CallEnd';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import MicIcon from '@material-ui/icons/Mic';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#EFF3F8',
  },
  tollbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'white',
    marginRight: 30,
    '&:last-child': {
      marginRight: 10,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 10,
    },
  },
  screenIcon: {
    color: '#2563EB',
  },
  endIcon: {
    color: '#EF4444',
  },
  icon: {
    color: '#4B5563',
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.tollbar}>
          <IconButton className={classes.iconButton}>
            <VideocamIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <MicIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <VolumeOffIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <DesktopWindowsIcon className={classes.screenIcon} />
          </IconButton>
          <IconButton onClick={() => router.push('/coachinbox')} className={classes.iconButton}>
            <CallEndIcon className={classes.endIcon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <MoreHorizIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
