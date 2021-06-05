import React from 'react';
import { Card, CardContent, Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-top: 100px;
  margin-left: 30px;
  width: 322px;
  height: 314px;
  min-width: 200px;
  box-shadow: '0px 1px 2px rgba(97, 97, 97, 0.2), 0px 2px 4px rgba(97, 97, 97, 0.2)';
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    background-color: orange !important;
    margin-top: 70px !important ;
    margin-lef: 0 !important;
    height: 40px !important;
    margin: o auto !important;
  }
`;

const StyledContainer = styled(CardContent)`
  padding: 40px !important;
  @media (max-width: 768px) {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    padding: 0 !important;
    background-color: yellow !important;
    height: 40px !important;
    width: 330px !important;
  }
`;
const StyledButton1 = styled(Button)`
  text-align: center !important;
  font-weight: bold !important;
  color: white !important;
  background-color: #4a148c !important;
  box-shadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e' !important;
  border-radius: 7px !important;
  height: 45px !important;
  width: 260px !important;
  font-size: 17px !important;
  margin-top: 9px !important;
  &:hover {
    background-color: white !important;
    color: #4a148c !important;
    border: 1px solid #4a148c !important;
  }
  @media (max-width: 768px) {
    width: 48px !important;
    height: 30px !important;
    background-color: red !important;
    font-size: 12px !important;
  }
`;

const StyledButton2 = styled(Button)`
  text-align: center !important;
  font-weight: bold !important;
  color: #4a148c !important;
  background-color: white !important;
  border: 1px solid #4a148c !important;
  box-shadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e' !important;
  border-radius: 7px !important;
  height: 45px !important;
  width: 260px !important;
  font-size: 17px !important;
  margin-top: 9px !important;
  &:hover: {
    background-color: #4a148c !important;
    color: white !important;
  }
  @media (max-width: 768px) {
    background-color: green !important;
    font-size: 12px !important;
  }
`;

const StyledContainerMobile = styled.div`
  margin-top: 60px;
  height: 30px;
  width: 386px;
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  align-items: center;
  padding: 6px 15px;
`;
const StyledButtonMobile = styled(Button)`
  height: 30px;
  border-radius: 10px !important;
  border: 1px solid #4a148c !important;
  padding: 6px, 15px, 6px, 15px;
  box-shadow: 0px 2px 4px rgba(97, 97, 97, 0.18), 0px 4px 8px rgba(97, 97, 97, 0.18);
  color: #4a148c !important;
  font-size: 12px !important;
  font-weight: bold !important;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 11px;
  &:hover: {
    background-color: #4a148c !important;
    color: white !important;
  }
`;

export default function SimpleCard() {
  return (
    <>
      <StyledContainerMobile className="d-block d-md-none d-lg-none">
        <StyledButtonMobile>All</StyledButtonMobile>
        <StyledButtonMobile>Messages</StyledButtonMobile>
        <StyledButtonMobile>Notification</StyledButtonMobile>
        <StyledButtonMobile>Bookings</StyledButtonMobile>
      </StyledContainerMobile>

      <StyledCard className="d-none d-md-block d-lg-block">
        <StyledContainer>
          <StyledButton1>All</StyledButton1>
          <StyledButton2>Messages</StyledButton2>
          <StyledButton2>Notification</StyledButton2>
          <StyledButton2>Bookings</StyledButton2>
        </StyledContainer>
      </StyledCard>
    </>
  );
}
