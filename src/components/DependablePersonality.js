import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./DependablePersonality.css"; // Update with your CSS file

export default function DependablePersonality() {
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

  // Function to create an array of stars based on the counter
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < itemsDeleted; i++) {
      stars.push(<span key={i} className="star" role="img" aria-label="Star">⭐</span>);
    }
    return stars;
  };

  return (
    <div className="homepage">
      <h1>Dependable Personality Page</h1>
      <p>Accomplishments: {itemsDeleted}</p>
      <p>Here's your stars</p>
      <div className="star-container">{renderStars()}</div>
      <button className="homepage-icon" onClick={handleBack}>
        Back to Homepage
      </button>
    </div>
  );
}