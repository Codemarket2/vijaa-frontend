import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import BottomBar from '../components/common/BottomBar';
import Navbar from '../components/Navbar';
import OfferingCard from '../components/coachOffering/OfferingCard';

const StyledButton = styled(Button)`
  background: #4a148c !important;
  border-radius: 5px !important;
  border: none !important;
  color: white !important;
  font-size: 18px !important;
  font-weight: bold !important;
  height: 54px !important;
  letter-spacing: 0.05em !important;
  margin-top: 100px !important;
  margin-right: 240px !important;
  margin-bottom: 30px !important;
  padding: 7px 3px !important;
  text-align: center !important;
  text-transform: capitalize !important;
  width: 300px !important;
  @media (max-width: 768px) {
    margin-top: 75px !important;
    margin-bottom: 20px !important;
    margin-right: 0 !important;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bgColor: {
      backgroundColor: '#F8F9FA !important',
      height: '100vh !important',
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
      cardWrapper: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  }),
);

export default function CoachOfferingScreen() {
  const classes = useStyles();

  return (
    <div className={classes.bgColor}>
      <Navbar title="offerings" />
      <Container>
        <div className={classes.btnContainer}>
          <StyledButton>CREATE AN OFFER</StyledButton>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <OfferingCard
            active={true}
            offerName="Offer 1"
            message=" Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum ..."
            profilePicture="https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/profile-picture@2x.png"
          />
          <OfferingCard
            active={true}
            offerName="Offer 2"
            message=" Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum ..."
            profilePicture="https://anima-uploads.s3.amazonaws.com/projects/60a8b428d2f388dac9235ff2/releases/60a8b4c0ca45c5cf1a894870/img/profile-picture@2x.png"
          />
        </div>
      </Container>
      <BottomBar />
    </div>
  );
}
