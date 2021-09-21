import React, { useState, useEffect } from "react";

import { getMe, deleteAsset } from "../../utils/API";
import Auth from "../../utils/auth";
import { removeAssetId } from "../../utils/localStorage";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../components/table.css';


export default function BasicTable() {
  const [userData, setUserData] = useState({});

  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        
        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();

        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  return (
    <TableContainer sx={{ width: "90%", margin: "0 auto" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assets</TableCell>
            <TableCell align="right">Book Value</TableCell>
            <TableCell align="right">Month Purchased</TableCell>
            <TableCell align="right">Useful Life</TableCell>
            <TableCell align="right">Monthly Depreciation Expense</TableCell>
            <TableCell align="right">Accumulated Depreciation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.assets
            ? userData.assets.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right" className="border">
                    {row.bookValue}
                  </TableCell>
                  <TableCell align="right" className="border">
                    {row.monthPurchased}
                  </TableCell>
                  <TableCell align="right" className="border">
                    {row.usefulLife}
                  </TableCell>
                  <TableCell align="right" className="border">
                    {row.monthlyDepreciationExpense}
                  </TableCell>
                  <TableCell align="right" className="border">
                    {row.accumulatedDepreciation}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
