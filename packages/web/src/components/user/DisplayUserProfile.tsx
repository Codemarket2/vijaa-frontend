import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';

import { formatDate } from '../../../../shared/config/dateFilter';

export default function DisplayUserProfile({ data }) {
  const { cancerType, dateOfDiagnose, symptoms, doctors } = data?.getUserProfile?.userProfile;
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Cancer Type
              </TableCell>
              <TableCell align="right">{cancerType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Date Of Diagnose
              </TableCell>
              <TableCell align="right">{formatDate(dateOfDiagnose)}</TableCell>
            </TableRow>
            {doctors.map((doctor) => (
              <>
                <TableRow key={doctor?._id}>
                  <TableCell component="th" scope="row">
                    Doctor Name
                  </TableCell>
                  <TableCell align="right">{doctor?.name}</TableCell>
                </TableRow>
                <TableRow key={doctor?._id}>
                  <TableCell component="th" scope="row">
                    Hospital Name
                  </TableCell>
                  <TableCell align="right">{doctor?.hospital}</TableCell>
                </TableRow>
              </>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                symptoms
              </TableCell>
              <TableCell align="right">
                {symptoms.map((symptom, index) => (
                  <div key={index}>{symptom}</div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
