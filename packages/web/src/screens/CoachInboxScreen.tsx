import * as React from 'react';
import InboxCard from '../components/coachInbox/InboxCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/coachInbox/Sidebar';
import Grid from '@material-ui/core/Grid';

export default function CoachInboxScreen() {
  return (
    <div style={{ backgroundColor: '#F8F9FA' }}>
      <Navbar />
      <Grid container>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={7} style={{ marginTop: 100 }}>
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
