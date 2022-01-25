import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { useGetAllContact } from '@frontend/shared/hooks/contact';
import ErrorLoading from '../common/ErrorLoading';
import Loading from '../common/Loading';

const StyledCard = styled(Card)`
  height: 50px !important;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 2%;
  margin-bottom: 5px;
`;

export default function ContactCard() {
  const { data, error, loading } = useGetAllContact();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <Paper style={{ padding: 10 }}>
        <h6>Total Send Contact: {data?.getAllContacts?.count}</h6>
        {data?.getAllContacts?.data.map((contact) => (
          <div key={contact._id}>
            <StyledCard
              variant="outlined"
              onClick={() => {
                alert('clicked');
              }}
            >
              <Typography>{contact.firstName ? contact.firstName : 'add name'}</Typography>
            </StyledCard>
          </div>
        ))}
      </Paper>
    </div>
  );
}
