import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import styled from 'styled-components';

import AutoCompleteInput from './AutoCompleteInput';
import CRUDMenu from '../../common/CRUDMenu';

const StyledH6 = styled.h6`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledGridContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

const StyledIconGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

const StyledIconGrid2 = styled(Grid)`
  display: flex;
  align-items: center !important;
  padding: 2%;
`;

export default function AutoComplete() {
  const [showForm, setShowForm] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleCancelForm = () => {
    setShowForm(!showForm);
    // setDisplayData(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setShowForm(!showForm);
    setDisplayData(!displayData);
  };
  const handleSumbit = () => {
    setShowForm(!showForm);
    setDisplayData(!displayData);
  };

  if (value === null || showForm) {
    return (
      <>
        <StyledH6>Cancer Type</StyledH6>
        {/* <Grid container direction="row" justifyContent="space-between"> */}
        <StyledGridContainer container>
          <Grid item xs={9} sm={10} md={11} lg={11}>
            <AutoCompleteInput cancerTypes={cancerTypes} setValue={setValue} value={value} />
          </Grid>
          <StyledIconGrid item xs={3} sm={2} md={1} lg={1}>
            {showForm && (
              <IconButton onClick={handleCancelForm}>
                <CancelIcon color="secondary" />
              </IconButton>
            )}
            <IconButton onClick={handleSumbit}>
              <SaveIcon color="primary" />
            </IconButton>
          </StyledIconGrid>
        </StyledGridContainer>
      </>
    );
  }

  return (
    <>
      <StyledH6>Cancer Type</StyledH6>
      <StyledIconGrid2 container>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <p style={{ fontSize: 16 }}>{value.cancerType && value.cancerType}</p>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <CRUDMenu
            onClose={handleClose}
            onEdit={handleEdit}
            onDelete={() => console.log('object')}
            show={anchorEl}
          />
        </Grid>
      </StyledIconGrid2>
    </>
  );
}

interface CancerType {
  cancerType: string;
}

const cancerTypes: CancerType[] = [
  { cancerType: 'The Shawshank Redemption' },
  { cancerType: 'The Godfather' },
  { cancerType: 'The Godfather: Part II' },
  { cancerType: 'The Dark Knight' },
  { cancerType: '12 Angry Men' },
  { cancerType: "Schindler's List" },
  { cancerType: 'Pulp Fiction' },
  { cancerType: 'The Lord of the Rings' },
  { cancerType: 'The Good' },
  { cancerType: 'Fight Club' },
  { cancerType: 'The Lord of the Rings' },
  { cancerType: 'Star Wars: Episode' },
  { cancerType: 'Forrest Gump' },
  { cancerType: 'Inception' },
  { cancerType: 'The Lord of the' },
  { cancerType: "One Flew Over the Cuckoo's Nest" },
  { cancerType: 'Goodfellas' },
  { cancerType: 'The Matrix' },
  { cancerType: 'Seven Samurai' },
  { cancerType: 'Star Wars: ' },
  { cancerType: 'City of God' },
  { cancerType: 'Se7en' },
  { cancerType: 'The Silence of the Lambs' },
  { cancerType: "It's a Wonderful Life" },
  { cancerType: 'Life Is Beautiful' },
  { cancerType: 'The Usual Suspects' },
  { cancerType: 'Léon: The Professional' },
  { cancerType: 'Spirited Away' },
  { cancerType: 'Saving Private Ryan' },
  { cancerType: 'Once Upon a Time in the West' },
  { cancerType: 'American History X' },
  { cancerType: 'Interstellar' },
  { cancerType: 'Casablanca' },
  { cancerType: 'City Lights' },
  { cancerType: 'Psycho' },
  { cancerType: 'The Green Mile' },
  { cancerType: 'The Intouchables' },
  { cancerType: 'Modern Times' },
  { cancerType: 'Raiders of the Lost Ark' },
  { cancerType: 'Rear Window' },
  { cancerType: 'The Pianist' },
  { cancerType: 'The Departed' },
  { cancerType: 'Terminator 2: Judgment Day' },
  { cancerType: 'Back to the Future' },
  { cancerType: 'Whiplash' },
  { cancerType: 'Gladiator' },
  { cancerType: 'Memento' },
  { cancerType: 'The Prestige' },
  { cancerType: 'The Lion King' },
  { cancerType: 'Apocalypse Now' },
  { cancerType: 'Alien' },
  { cancerType: 'Sunset Boulevard' },
  { cancerType: 'Dr. Strangelove ' },
  { cancerType: 'The Great Dictator' },
  { cancerType: 'Cinema Paradiso' },
  { cancerType: 'The Lives of Others' },
  { cancerType: 'Grave of the Fireflies' },
  { cancerType: 'Paths of Glory' },
  { cancerType: 'Django Unchained' },
  { cancerType: 'The Shining' },
  { cancerType: 'WALL·E' },
  { cancerType: 'American Beauty' },
  { cancerType: 'The Dark Knight Rises' },
  { cancerType: 'Princess Mononoke' },
  { cancerType: 'Aliens' },
  { cancerType: 'Oldboy' },
  { cancerType: 'Once Upon a Time in America' },
  { cancerType: 'Witness for the Prosecution' },
  { cancerType: 'Das Boot' },
  { cancerType: 'Citizen Kane' },
  { cancerType: 'North by Northwest' },
  { cancerType: 'Vertigo' },
  { cancerType: 'Star Wars: Episode' },
  { cancerType: 'Reservoir Dogs' },
  { cancerType: 'Braveheart' },
  { cancerType: 'M' },
  { cancerType: 'Requiem for a Dream' },
  { cancerType: 'Amélie' },
  { cancerType: 'A Clockwork Orange' },
  { cancerType: 'Like Stars on Earth' },
  { cancerType: 'Taxi Driver' },
  { cancerType: 'Lawrence of Arabia' },
  { cancerType: 'Double Indemnity' },
  { cancerType: 'Eternal Mind' },
  { cancerType: 'Amadeus' },
  { cancerType: 'To Kill a Mockingbird' },
  { cancerType: 'Toy Story 3' },
  { cancerType: 'Logan' },
  { cancerType: 'Full Metal Jacket' },
  { cancerType: 'Dangal' },
  { cancerType: 'The Sting' },
  { cancerType: '2001: ' },
  { cancerType: "Singin' in the Rain" },
  { cancerType: 'Toy Story' },
  { cancerType: 'Bicycle Thieves' },
  { cancerType: 'The Kid' },
  { cancerType: 'Inglourious Basterds' },
  { cancerType: 'Snatch' },
  { cancerType: '3 Idiots' },
  { cancerType: 'Monty Python' },
];
