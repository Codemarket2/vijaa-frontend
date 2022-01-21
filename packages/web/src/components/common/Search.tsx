import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetListTypes } from '../../../../shared/hooks/list/index';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

export default function SearchComponent() {
  const { data, loading, error, state, setState } = useGetListTypes();
  // Changes to true if user types anything, don't want to show user results in the navbar before he begins typing
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (loading === false) {
      console.log('data: ', data, loading);
    }
  }, [data, loading]);

  return (
    <Container style={{ position: 'relative' }}>
      <TextField
        size="small"
        variant="outlined"
        label="Search"
        className="w-75"
        InputProps={{
          endAdornment:
            loading && state.search ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <InputAdornment position="end" role="button">
                <IconButton
                  edge="end"
                  onClick={() => {
                    setState({ ...state, search: '' });
                    setTouched(false);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
        }}
        value={state.search}
        onChange={(e) => {
          setState({ ...state, search: e.target.value });
          setTouched(true);
        }}
      />
      {loading === false && touched && data ? (
        <List
          style={{
            position: 'absolute',
            top: '40px',
            left: '10px',
            backgroundColor: '#293141',
            width: '100%',
            zIndex: 2,
          }}
        >
          {data.getListTypes.data.map((t) => {
            return (
              <>
                <Divider />
                <Link href={`/types/${t.slug}`}>
                  <ListItem>{t.slug}</ListItem>
                </Link>
              </>
            );
          })}
        </List>
      ) : (
        ''
      )}
    </Container>
  );
}
