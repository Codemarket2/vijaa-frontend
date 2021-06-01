import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    marginLeft: 30,
    width: 322,
    height: 314,
    minWidth: 200,
    boxShadow: '0px 1px 2px rgba(97, 97, 97, 0.2), 0px 2px 4px rgba(97, 97, 97, 0.2);',
    display: 'flex',
    justifyContent: 'center',
  },
  button1: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4a148c',
    boxShadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e',
    borderRadius: 7,
    height: 45,
    width: 260,
    fontSize: 17,
    marginTop: 9,
    '&:hover': {
      backgroundColor: 'white',
      color: '#4a148c',
      border: '1px solid #4a148c',
    },
  },
  container: {
    padding: 40,
  },
  button2: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4a148c',
    backgroundColor: 'white',
    border: '1px solid #4a148c',
    boxShadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e',
    borderRadius: 7,
    height: 45,
    width: 260,
    fontSize: 17,
    marginTop: 9,
    '&:hover': {
      backgroundColor: '#4a148c',
      color: 'white',
    },
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.container}>
        <Button className={classes.button1}>all</Button>
        <Button className={classes.button2}>Messages</Button>
        <Button className={classes.button2}>Notification</Button>
        <Button className={classes.button2}>Bookings</Button>
      </CardContent>
    </Card>
  );
}
