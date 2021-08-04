import React, { useState, useEffect } from 'react';
import { TextField, Chip, Grid } from '@material-ui/core';
import styled from 'styled-components';

const StyledChipContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;
const StyledContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
`;
export default function ChipInput({ onChange }) {
  const [state, setState] = useState({ value: '', symptoms: [] });
  useEffect(() => {
    onChange(state.symptoms.map((m) => m));
  }, [state.symptoms]);

  const handleChange = (e) => {
    setState({ ...state, value: e.target.value });
  };
  const handleKeyDown = (evt) => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();

      let symptom = state.value.trim();
      if (symptom) {
        setState({
          ...state,
          symptoms: [...state.symptoms, symptom],
          value: '',
        });
      }
    }
  };

  const handleDelete = (toBeRemoved) => {
    setState({ ...state, symptoms: state.symptoms.filter((symptom) => symptom !== toBeRemoved) });
  };

  return (
    <StyledContainer>
      <TextField
        variant="outlined"
        label="Add Symptoms"
        value={state.value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fullWidth
        data-testid="addSymptoms"
      />

      <StyledChipContainer>
        {state.symptoms.map((symptom) => (
          <div key={symptom}>
            <Chip label={symptom} onDelete={() => handleDelete(symptom)} />
          </div>
        ))}
      </StyledChipContainer>
    </StyledContainer>
  );
}
