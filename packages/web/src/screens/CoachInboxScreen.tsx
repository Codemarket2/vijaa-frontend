import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import BottomBar from '../components/common/BottomBar';
import InboxCard from '../components/common/InboxCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/coachInbox/Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: 100,
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
      },
    },
    bgColor: {
      backgroundColor: '#F8F9FA !important',
      height: '100vh !important',
    },
  }),
);

export default function CoachInboxScreen() {
  const classes = useStyles();
  return (
    <div className={classes.bgColor}>
      <Navbar />
      <Grid container>
        <Grid item md={3} xs={12}>
          <Sidebar />
        </Grid>
        <Grid item md={7} xs={12} className={classes.grid}>
          <InboxCard
            profilePicture={inboxCardWebData.profilePicture}
            name={inboxCardWebData.nameI1453117569}
            date={inboxCardWebData.dateI1453117570}
            body={inboxCardWebData.spanText}
          />
          <InboxCard
            profilePicture={inboxCardWeb2Data.profilePicture}
            name={inboxCardWeb2Data.nameI1454117569}
            date={inboxCardWeb2Data.dateI1454117570}
            body={inboxCardWeb2Data.spanText}
          />
          <InboxCard
            profilePicture={inboxCardWeb3Data.profilePicture}
            name={inboxCardWeb3Data.nameI1455117569}
            date={inboxCardWeb3Data.dateI1455117570}
            body={inboxCardWeb2Data.spanText}
          />
        </Grid>
      </Grid>
      <Grid item md={3} xs={12}>
        <BottomBar />
      </Grid>
    </div>
  );
}

const navbarData = {
  brandLogoI145197: 'Drreamz',
  text1: 'Inbox',
  vector2:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/vector-6@2x.svg',
  text2: 'Calender',
  offer:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/offer@2x.svg',
  text3: 'Offerings',
  vector3:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/vector-7@2x.svg',
  text4: 'Session',
  vector4:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/vector-8@2x.svg',
  text5: 'Clients',
  vector5:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/vector-4@2x.svg',
  text6: 'Settings',
  profile:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/profile@2x.svg',
  text7: 'Profile',
};

const inboxCardWebData = {
  profilePicture:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/profile-picture@2x.png',
  nameI1453117569: 'Jenny Oswald',
  dateI1453117570: '03-May-2021',
  spanText: 'Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum',
};

const inboxCardWeb2Data = {
  profilePicture:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/profile-picture-1@2x.png',
  nameI1454117569: 'Jake',
  dateI1454117570: '03-May-2021',
  spanText: 'Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum',
};

const inboxCardWeb3Data = {
  profilePicture:
    'https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/profile-picture-2@2x.png',
  nameI1455117569: 'sam',
  dateI1455117570: '03-May-2021',
  spanText: 'Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum',
};

const webpage7Data = {
  text: 'All',
  text2: 'Messages',
  text3: 'Notifications',
  text4: 'Bookings',
  navbarProps: navbarData,
  inboxCardWebProps: inboxCardWebData,
  inboxCardWeb2Props: inboxCardWeb2Data,
  inboxCardWeb3Props: inboxCardWeb3Data,
};
