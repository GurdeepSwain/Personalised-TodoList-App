import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./homepage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import SeriousPersonality from "./SeriousPersonality";
import ResponsiblePersonality from "./ResponsiblePersonality";
import LivelyPersonality from "./LivelyPersonality";
import ExtravertedPersonality from "./ExtravertedPersonality";
import DependablePersonality from "./DependablePersonality";

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const [userPersonality, setUserPersonality] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemsDeleted, setItemsDeleted] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}/todo`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
        onValue(ref(db, `${auth.currentUser.uid}/persona/personality`), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          setUserPersonality(data);
        });
        onValue(ref(db, `/${auth.currentUser.uid}/itemsDeleted`), (snapshot) => {
          const count = snapshot.val() || 0;
          setItemsDeleted(count);
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/todo/${uidd}`), {
      todo: todo,
      uidd: uidd
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/todo/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/todo/${uid}`));

    setItemsDeleted((prevCount) => prevCount + 1);

    // Increment the counter in Firebase
    update(ref(db, `/${auth.currentUser.uid}`), {
      itemsDeleted: itemsDeleted + 1
    });
    // Display pop-up based on personality
    setShowDeletePopup(true);

    // Close the pop-up after 3 seconds
    setTimeout(() => {
      setShowDeletePopup(false);
    }, 10000);
  };

  const handleBack = () => {
    navigate("/homepage");
  };

  const renderPersonalityComponent = () => {
    switch (userPersonality) {
      case "serious":
        return <SeriousPersonality itemsDeleted={itemsDeleted} handleBack={handleBack} />;
      case "extraverted":
        return <ExtravertedPersonality itemsDeleted={itemsDeleted} handleBack={handleBack} />;
      case "lively":
        return <LivelyPersonality itemsDeleted={itemsDeleted} handleBack={handleBack} />;
      case "responsible":
        return <ResponsiblePersonality itemsDeleted={itemsDeleted} handleBack={handleBack} />;
      case "dependable":
        return <DependablePersonality itemsDeleted={itemsDeleted} handleBack={handleBack} />;
              // Add cases for other personality types
      default:
        return null;
    }
  };

  const handlePersonalityPage = () => {
    navigate(`/${userPersonality}`);
  };

  return (
    <div className="homepage">
      <input
        className="add-edit-input"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

{showDeletePopup && (
        <div className={`delete-popup ${userPersonality}`}>
          {userPersonality === "serious" && <p>You're doing great! Keep up the good work.</p>}
{userPersonality === "extraverted" && <p>Celebrate your achievements! Share them with friends.</p>}
{userPersonality === "lively" && <p>Awesome! Your progress is making a difference.</p>}
{userPersonality === "responsible" && <p>Well done! Your tasks are in order.</p>}
{userPersonality === "dependable" && <p>You're on track! Keep accomplishing your goals.</p>}
          <p>{itemsDeleted} items completed so far.</p>
        </div>
      )}

{todos.map((todo) => (
  <div className="todo">
    <h1>{todo.todo}</h1>
    <EditIcon
      fontSize="large"
      onClick={() => handleUpdate(todo)}
      className="edit-button"
    />
    <CheckIcon
      fontSize="large"
      onClick={() => handleDelete(todo.uidd)}  
      className="delete-button"
    />
  </div>
))}

      {isEdit ? (
        <div>
        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
        <button className="Personality-icon" onClick={handlePersonalityPage}>Go to Personality Page</button>

        <button className="Leaderboard-icon" onClick={() => navigate("/leaderboard")}>Leaderboard</button>

        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
    </div>
  );
}
