import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
`;

const StyledContainer = styled(CardContent)`
  padding: 40px !important;
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
`;

export default function SimpleCard() {
  return (
    <StyledCard>
      <StyledContainer>
        <StyledButton1>All</StyledButton1>
        <StyledButton2>Messages</StyledButton2>
        <StyledButton2>Notification</StyledButton2>
        <StyledButton2>Bookings</StyledButton2>
      </StyledContainer>
    </StyledCard>
  );
}
