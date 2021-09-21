import React, { useState, useEffect } from "react";

import { getMe} from "../../utils/API";
import Auth from "../../utils/auth";

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
    
    function totalMonthlyDep({assets}) {
        let sum = 0;
        
        assets.map((row) => (sum += row.monthlyDepreciationExpense))

        return sum;
    }

    return (
        <div>
            <h1>Monthly Depreciation Expense</h1>
            <h2>
                {userData.assets ?
                    totalMonthlyDep(userData)
                    : 0
                }
            </h2>
        </div>
    )
}

export default Dashboard
