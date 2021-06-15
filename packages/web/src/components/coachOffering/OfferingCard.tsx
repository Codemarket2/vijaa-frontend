import React from 'react';
import { Grid, Button, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      textAlign: 'center',
    },
  }),
);

const StyledGridContainer = styled(Grid)`
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.87);
  height: 180px !important;
  margin-bottom: 20px;
  padding-top: 20px;
  width: 750px !important;
  @media (max-width: 768px) {
    height: 124px !important;
    width: 42vh !important;
    border-radius: none !important;
    padding-top: 0 !important;
  }
`;

const StyledProfileGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

const StyledProfileWrapper = styled.div`
  height: 100px;
  width: 100px;
  @media (max-width: 768px) {
    height: 50px !important;
    width: 50px !important;
  }
`;
const StyledProfilePicture = styled.img`
  display: block;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
`;

const StyledOfferName = styled.h6`
  margin-bottom: 0.35em;
  font-size: 1.3rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 16px !important;
    margin-bottom: 2px !important;
  }
`;

const StyledOfferMessage = styled.p`
  color: #616161;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 14px !important;
    margin: 0 !important;
  }
`;

const StyledOfferLink = styled.p`
  color: #4a148c;
  font-size: 1.2rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 14px !important;
    font-weight: bold !important;
    margin-top: 5px !important;
    margin-bottom: 0 !important;
  }
`;

const StyledPreviewButton = styled(Button)`
  background-color: #7c43bd !important;
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #fff !important;
  font-size: 12px;
  height: 45px;
  text-align: center;
  width: 109px;
  @media (max-width: 768px) {
    height: 30px !important;
    width: 60px !important;
    font-size: 10px !important;
    border-radius: 14px !important;
  }
`;
export default function OfferingCard({ offerName, message, profilePicture, active = false }) {
  const classes = useStyles();
  return (
    <div>
      <StyledGridContainer container direction="column" justify="space-around" alignItems="center">
        <StyledProfileGrid item lg={2}>
          <StyledProfileWrapper>
            <StyledProfilePicture alt="img" src={profilePicture} />
          </StyledProfileWrapper>
        </StyledProfileGrid>
        <Grid item lg={7} xs={6}>
          <Grid container direction="column" justify="center" alignItems="flex-start">
            <Grid item lg={12}>
              <StyledOfferName>{offerName}</StyledOfferName>
            </Grid>
            <Grid item lg={12}>
              <StyledOfferMessage>{message}</StyledOfferMessage>
            </Grid>
            <Grid item lg={3}>
              {active ? <StyledOfferLink>Acitve</StyledOfferLink> : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <StyledPreviewButton>preivew</StyledPreviewButton>
        </Grid>
      </StyledGridContainer>
    </div>
  );
}
