import React, { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  Grid,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';

import Loading from '../common/Loading';
import ErrorLoading from '../common/ErrorLoading';
import { useAbout } from '../../../../shared/hooks/user/users';

const StyledContainer = styled(Container)`
  padding: 2%;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

export default function About() {
  const [state, setState] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { createAbout, getAbout } = useAbout();
  const {
    handleCreateAbout,
    data: createAboutData,
    error: createAboutError,
    loading: createLoading,
  } = createAbout();

  const { loading, error, data } = getAbout();

  const handleChange = (e) => {
    let about = e.target.value;
    setState(about);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateAbout({
      variables: {
        about: state,
      },
    });
    setShowForm(!showForm);
  };
  console.log(`About ${state}`);
  if (loading) return <Loading />;
  if (error) return <ErrorLoading error={error} />;
  const { about } = data?.getAbout;
  return (
    <>
      <Paper
        variant="outlined"
        className="my-2 pr-1 d-flex justify-content-between align-items-center"
        style={{ minHeight: 55 }}>
        <StyledContainer>
          <Grid container alignItems="center">
            <Grid item lg={11} md={11} sm={11} xs={11}>
              <h5>About</h5>
            </Grid>
            <StyledGrid item lg={1} md={1} sm={1} xs={1}>
              <IconButton onClick={() => setShowForm(!showForm)}>
                <CreateIcon />
              </IconButton>
            </StyledGrid>
          </Grid>

          {showForm && (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Tell Something About You.."
                value={state}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button fullWidth variant="contained" color="primary" type="submit">
                submit
              </Button>
            </form>
          )}
          {!showForm && <Typography>{createLoading ? <Loading /> : about && about}</Typography>}
        </StyledContainer>
      </Paper>
    </>
  );
}
