import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   flexGrow: 1,
    //   marginBottom: 20,
    // },
    // paper: {
    //   padding: theme.spacing(5),
    //   margin: 'auto',
    //   maxWidth: 750,
    //   boxShadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e',
    // },
    image: {
      width: 100,
      height: 100,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

const StyledContainer = styled.div`
  flex-grow: 1;
  margin-bottom: 20;
`;
const StyledPaper = styled(Paper)`
  padding: 40;
  margin: auto;
  max-width: 750;
  box-shadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e';
`;

export default function InboxCard2({ profilePicture, name, date, body }) {
  const classes = useStyles();
  return (
    <StyledContainer>
      {/* // <div className={classes.root}> */}
      {/* <Paper className={classes.paper}> */}
      <StyledPaper>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt="complex" src={profilePicture} />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {body}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                {date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </StyledPaper>
      {/* </Paper> */}
      {/* </div> */}
    </StyledContainer>
  );
}
