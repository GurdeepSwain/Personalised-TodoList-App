import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./ExtravertedPersonality.css"; // Update with your CSS file

export default function ExtravertedPersonality() {
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

  const handleShare = () => {
    // Implement logic to share accomplishments on social media
    // You can use social media APIs or simple share functionality
    alert(`Share your ${itemsDeleted} accomplishments with friends on Facebook, Twitter, and Instagram!`);
  };

  return (
    <div className="homepage">
      <h1>Extraverted Personality Page</h1>
      <p>Accomplishments: {itemsDeleted}</p>
      <div className="social-icons">
        <div onClick={handleShare} className="social-icon">Facebook</div>
        <div onClick={handleShare} className="social-icon">Twitter</div>
        <div onClick={handleShare} className="social-icon">Instagram</div>
      </div>
      <button className="homepage-icon" onClick={handleBack}>
        Back to Homepage
      </button>
    </div>
  );
}