import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./SeriousPersonality.css"; // Update with your CSS file

export default function SeriousPersonality() {
  const navigate = useNavigate();
  const [itemsDeleted, setItemsDeleted] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(0);

  useEffect(() => {
    // Fetch the itemsDeleted counter from Firebase
    const itemsDeletedRef = ref(db, `/${auth.currentUser.uid}/itemsDeleted`);

    onValue(itemsDeletedRef, (snapshot) => {
      const deletedCount = snapshot.val() || 0;
      setItemsDeleted(deletedCount);

      // Assuming the daily goal is 10 tasks
      const goal = 10;
      const remainingCount = Math.max(0, goal - deletedCount);
      setRemainingTasks(remainingCount);
    });
  }, []);

  const handleBack = () => {
    navigate("/homepage");
  };

  return (
    <div className="homepage">
      <h1>Serious Personality Page</h1>
      <p>Items Completed: {itemsDeleted}</p>
      <p>Remaining Tasks to Daily Goal: {remainingTasks}</p>
      <button className="homepage-icon" onClick={handleBack}>
        Back to Homepage
      </button>
    </div>
  );
}