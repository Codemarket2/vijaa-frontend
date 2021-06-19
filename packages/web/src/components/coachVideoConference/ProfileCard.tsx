import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
const useStyle = makeStyles((theme: Theme) => createStyles({}));

const StyledProfileContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 6px solid #fff;
  border-radius: 10px;
  position: relative;
  @media (max-width: 768) {
    width: 100px !important;
    height: 100px !important;
  }
`;

const StyledProfileMedia = styled.img`
  height: 100%;
  width: 100%;
`;

const StyledUsername = styled.h6`
  color: #374151;
  left: 1px;
  top: -29px;
  background: linear-gradient(
    93.79deg,
    rgba(255, 255, 255, 0.26) 1%,
    rgba(255, 255, 255, 0.5655) 99.22%
  );
  backdrop-filter: blur(19px);
  border-radius: 10px;
  font-weight: bold;
  position: absolute;
  padding: 5px 10px 5px 10px;
`;

interface Props {
  Username: string;
  profileMedia: string;
}
export default function ProfileCard({ Username, profileMedia }: Props) {
  const classes = useStyle();
  return (
    <StyledProfileContainer>
      <StyledProfileMedia src={profileMedia} />
      <div style={{ position: 'relative' }}>
        <StyledUsername>{Username}</StyledUsername>
      </div>
    </StyledProfileContainer>
  );
}
