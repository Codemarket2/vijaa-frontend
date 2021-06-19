import { Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import BottomNav from '../components/coachVideoConference/BottomNav';
import ProfileCard from '../components/coachVideoConference/ProfileCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      position: 'absolute',
      height: '100vh',
      width: '100%',
      backgroundColor: '#000',
      zIndex: '-2',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgBackground: {
      height: '85vh',
      width: '80%',
      position: 'absolute',
      top: 25,
      borderRadius: 20,
      zIndex: '-1',
      [theme.breakpoints.down('sm')]: {
        width: '45vh',
        height: '93vh',
        borderRadius: 0,
        top: 0,
      },
    },
    timer: {
      background: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
      zIndex: 1,
      position: 'absolute',
      left: 170,
      top: 24,
      width: 160,
      height: 60,
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        left: 0,
        top: 0,
        width: 'auto',
        height: 'auto',
      },
    },
    gridScreenLayout: {
      position: 'absolute',
      bottom: 92,
    },
    gridScreenLayoutItem: {
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        marginRight: 10,
      },
    },
  }),
);

export default function CoachVideoConferenceScreen() {
  const classes = useStyles();
  return (
    <div>
      <div className={`${classes.background} d-none d-lg-block d-xl-block d-md-block`}></div>
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={12} lg={2}>
            <Paper className={classes.timer}>
              <h5>Coach</h5>
              <p>10:02</p>
            </Paper>
          </Grid>
        </Grid>
        <img
          src="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623925956/muz/background_reskq6.jpg"
          className={classes.imgBackground}
        />
      </div>
      <Grid container className={classes.gridScreenLayout} justify="center">
        <Grid item className={classes.gridScreenLayoutItem}>
          <ProfileCard
            Username="user1"
            profileMedia="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623925992/muz/1_pps8d4.jpg"
          />{' '}
        </Grid>
        <Grid item className={classes.gridScreenLayoutItem}>
          <ProfileCard
            Username="user2"
            profileMedia="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623925995/muz/2_zdrgkd.jpg"
          />{' '}
        </Grid>
        <Grid item className={classes.gridScreenLayoutItem}>
          <ProfileCard
            Username="user3"
            profileMedia="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623925991/muz/3_dejlai.jpg"
          />{' '}
        </Grid>
        <Grid item className={classes.gridScreenLayoutItem}>
          <ProfileCard
            Username="user4"
            profileMedia="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623925997/muz/4_gcfkjs.jpg"
          />{' '}
        </Grid>
        <Grid item className={classes.gridScreenLayoutItem}>
          <ProfileCard
            Username="user5"
            profileMedia="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623925993/muz/5_z5zfik.jpg"
          />{' '}
        </Grid>
        <Grid item className={classes.gridScreenLayoutItem}>
          <ProfileCard
            Username="user6"
            profileMedia="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1623926001/muz/6_ylovzr.jpg"
          />{' '}
        </Grid>
      </Grid>
      <BottomNav />
    </div>
  );
}
