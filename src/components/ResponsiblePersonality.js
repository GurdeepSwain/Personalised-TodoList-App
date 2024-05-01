import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./ResponsiblePersonality.css"; // Update with your CSS file

export default function ResponsiblePersonality() {

  const navigate = useNavigate();
  const [itemsDeleted, setItemsDeleted] = useState(0);

  useEffect(() => {
    // Fetch the itemsDeleted counter from Firebase
    const itemsDeletedRef = ref(db, `/${auth.currentUser.uid}/itemsDeleted`);
    onValue(itemsDeletedRef, (snapshot) => {
      const count = snapshot.val() || 0;
      setItemsDeleted(count);
    });
  }, []);

  const handleBack = () => {
    navigate("/homepage");
  };

  return (
    <div className="homepage">
      <h1>Responsible Personality Page</h1>
      <p>Level Reached: {itemsDeleted}</p>
      <button className="homepage-icon" onClick={handleBack}>Back to Homepage</button>
    </div>
  );
}