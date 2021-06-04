import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    grid: {
      position: 'relative',
    },
  }),
);

const StyledContainer = styled.div`
  flex-grow: 1 !important;
  margin-bottom: 20px !important;
`;

const StyledPaper = styled(Paper)`
  padding: 40px !important;
  margin: auto !important;
  max-width: 750px !important;
  box-shadow: '0px 4px 8px #6161612e, 0px 2px 4px #6161612e !important';
`;

//mobile inbox card
const StyledMobileCard = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 4px 8px #6161612e, 0px 2px 4px #6161612e;
  height: 151px;
  mix-blend-mode: normal;
  overflow: hidden;
  padding: 31.2px 11px;
  width: 350px;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const StyledName = styled.h1`
  letter-spacing: 0;
  mix-blend-mode: normal;
  color: #4a148c;
  font-size: 21px;
  font-weight: 700;
`;

const StyledDate = styled.div`
  letter-spacing: 0;
  color: #616161;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
`;
const StyledMessage = styled.div`
  letter-spacing: 0;

  color: #616161;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
`;
const StyleProfilePicture = styled.div`
  background: url(${(props) => props.background});
  background-size: cover;
  border-radius: 40px;
  height: 81px;
  mix-blend-mode: normal;
  width: 81px;
`;
export default function InboxCard2({ profilePicture, name, date, body }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up('xs'));

  const classes = useStyles();
  return (
    <>
      <StyledMobileCard className="d-block d-md-none d-s-none d-lg-none ">
        <Grid container justify="space-between">
          <Grid item xs={3}>
            <StyleProfilePicture background={profilePicture}></StyleProfilePicture>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid container direction="row" justify="space-between">
                <StyledName>{name}</StyledName>
                <StyledDate>{date}</StyledDate>
              </Grid>
              <StyledMessage>{body}</StyledMessage>
            </Grid>
          </Grid>
        </Grid>
      </StyledMobileCard>

      <StyledContainer className="d-none d-md-block d-lg-block">
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
      </StyledContainer>
    </>
  );
}
