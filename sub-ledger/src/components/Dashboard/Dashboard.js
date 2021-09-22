import React, { useState, useEffect } from "react";

import { getMe } from "../../utils/API";
import Auth from "../../utils/auth";
import { formatPositive } from "../../utils/formatMoney";
import "./Dashboard.css";

function Dashboard() {
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

  function totalMonthlyDep({ assets }) {
    let sum = 0;

    assets.map((row) => (sum += row.monthlyDepreciationExpense));

    return formatPositive(sum);
  }

  return (
    // <div>
    //   <h1>Monthly Depreciation Expense</h1>
    //   <h2>{userData.assets ? totalMonthlyDep(userData) : formatPositive(0)}</h2>
    // </div>
    <div class="card text-center Form">
      <div class="card-header">Monthly Depreciation Expense</div>
      <div class="card-body">
        <h5 class="card-title">Total Amount</h5>
        <p class="card-text">
          {userData.assets ? totalMonthlyDep(userData) : formatPositive(0)}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
