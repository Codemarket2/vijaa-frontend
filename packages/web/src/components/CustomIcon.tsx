import React from 'react';
import { IconButton, SvgIcon } from '@material-ui/core';
export default function CustomIcon({ path }) {
  return (
    <>
      <SvgIcon>
        <path d={path} />
      </SvgIcon>
    </>
  );
}
