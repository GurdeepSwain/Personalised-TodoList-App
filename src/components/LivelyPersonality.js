import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./LivelyPersonality.css";

export default function LivelyPersonality() {
    const navigate = useNavigate();
    const [itemsDeleted, setItemsDeleted] = useState(0);

    const handleBack = () => {
      navigate("/homepage");
    };

    useEffect(() => {
        // Fetch the itemsDeleted counter from Firebase
        const itemsDeletedRef = ref(db, `/${auth.currentUser.uid}/itemsDeleted`);
        onValue(itemsDeletedRef, (snapshot) => {
          const count = snapshot.val() || 0;
          setItemsDeleted(count);
        });
      }, []);

      const avatars = Array.from({ length: itemsDeleted }, (_, index) => (
        <div key={index} className="avatar">
          <img src={`https://robohash.org/${index + 1}?set=set1&size=100x100`} alt={`Avatar ${index + 1}`} />
        </div>
      ));
    
    return (
    <div className="homepage">
      <h1>Lively Personality Page</h1>
      
      <div className="avatar-container">{avatars}</div>

      <button className="homepage-icon" onClick={handleBack}>Back to Homepage</button>
    </div>
  );
}