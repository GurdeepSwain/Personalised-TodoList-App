// Leaderboard.js
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase.js";
import { Link } from "react-router-dom";
import "./LeaderBoard.css"; // Make sure to import the CSS file

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const leaderboardRef = ref(db, "/");
    
    onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leaderboardArray = Object.entries(data)
          .sort(([, a], [, b]) => b.itemsDeleted - a.itemsDeleted)
          .map(([uid, userData]) => ({
            uid,
            email: userData.email,
            itemsDeleted: userData.itemsDeleted
          }))
          .slice(0, 10); // Limit to the first 10 items
        setLeaderboardData(leaderboardArray);
      }
    });
  }, []);

  return (
    <div className="homepage">
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <ul>
          {leaderboardData.map((user) => (
            <li key={user.uid} className="leaderboard-item">
              <span>User {user.email} - </span>
              <span>{user.itemsDeleted} items completed</span>
            </li>
          ))}
        </ul>

        <Link to="/homepage">
          <button className="leaderboard-icon">Back to Homepage</button>
        </Link>
      </div>
    </div>
    </div>
  );
}