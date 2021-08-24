import ClearIcon from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { ReactNode } from 'react';

import IconButton from '@material-ui/core/IconButton';

interface IProps {
  showSearch: boolean;
  onShow: () => void;
  onHide: () => void;
  onChange: (value: string) => void;
  search: string;
  children?: ReactNode;
  button?: ReactNode;
  buttonClass?: string;
}

export default function ListHeader({
  showSearch,
  onShow,
  onHide,
  onChange,
  search,
  children,
  button,
  buttonClass = 'justify-content-end',
}: IProps) {
  return (
    <Paper
      className="px-2 d-flex flex-row-reverse justify-content-between align-items-center"
      variant="outlined"
      style={{ minHeight: 60 }}>
      <div className={`d-flex align-items-center w-100 ${buttonClass}`}>
        {showSearch ? (
          <TextField
            size="small"
            variant="outlined"
            label="Search"
            className="w-75"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" role="button">
                  <IconButton edge="end" onClick={onHide}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={({ target: { value } }) => onChange(value)}
          />
        ) : (
          <IconButton edge="end" onClick={onShow}>
            <SearchIcon />
          </IconButton>
        )}
        {button}
      </div>
      {children}
    </Paper>
  );
}