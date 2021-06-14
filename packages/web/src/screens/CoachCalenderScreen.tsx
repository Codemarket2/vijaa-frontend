import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';

import BottomBar from '../components/common/BottomBar';
import Navbar from '../components/Navbar';
import InboxCard from '../components/common/InboxCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bgColor: {
      backgroundColor: '#F8F9FA !important',
      height: '100vh !important',
    },

    datePicker: {
      marginTop: '70px',
      display: 'flex',
      justifyContent: 'center',
    },
    grid: {
      marginTop: 100,
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
      },
    },
    gridDatePicker: {
      marginTop: 100,
      [theme.breakpoints.down('sm')]: {
        marginTop: 70,
      },
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

export default function CoachCalenderScreen() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const classes = useStyles();

  return (
    <div className={classes.bgColor}>
      <Navbar title="Booking Details" />
      <Grid container>
        <Grid item lg={3} md={3} xs={12} className={classes.gridDatePicker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item lg={7} xs={12} className={classes.grid}>
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
        <Grid item md={3} xs={12}>
          <BottomBar />
        </Grid>
      </Grid>
    </div>
  );
}

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
