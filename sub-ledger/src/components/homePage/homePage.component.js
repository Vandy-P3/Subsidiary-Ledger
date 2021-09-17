import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../components/table.css';

function createData(name, bookValue, monthPurchased, usefulLife, depreciationMethod, monthlyDepExp, accumulatedDepreciation) {
  return { name, bookValue, monthPurchased, usefulLife, depreciationMethod, monthlyDepExp, accumulatedDepreciation };
}

const rows = [
  createData('car', 159, 6.0, 24, 4.0, 45, 64),
  createData('boat', 237, 9.0, 37, 4.3, 45, 64),
  createData('plane', 262, 16.0, 24, 6.0, 45, 64),
  createData('house', 305, 3.7, 67, 4.3, 45, 64),
  createData('lawn', 356, 16.0, 49, 3.9, 45, 64),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assets</TableCell>
            <TableCell align="right">Book Value</TableCell>
            <TableCell align="right">Month Purchased</TableCell>
            <TableCell align="right">Useful Life</TableCell>
            <TableCell align="right">Depreciation Method</TableCell>
            <TableCell align="right">Monthly Depreciation Expense</TableCell>
            <TableCell align="right">Accumulated Depreciation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.bookValue}</TableCell>
              <TableCell align="right">{row.monthPurchased}</TableCell>
              <TableCell align="right">{row.usefulLife}</TableCell>
              <TableCell align="right">{row.depreciationMethod}</TableCell>
              <TableCell align="right">{row.monthlyDepExp}</TableCell>
              <TableCell align="right">{row.accumulatedDepreciation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
