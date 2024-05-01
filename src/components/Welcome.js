import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import TodoSVG from '../assets/todo-svg.svg'
import { auth, db } from "../firebase.js";
import { set, ref, onValue, remove, update } from "firebase/database";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [personality, setPersonality] = useState("serious");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handlePersonalityChange = (e) => {
    setPersonality(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(db, `${auth.currentUser.uid}/persona`, user.uid);
      const userEmailRef = ref(db, `${auth.currentUser.uid}`, user.uid);

      set(userEmailRef, {
        email: registerInformation.email
      })

      set(userRef, {
        email: registerInformation.email,
        personality: personality,
      })
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
    <img src={TodoSVG} className="todo-svg" />
      <h1>Todo-List</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
            />
            <select
            value={personality}
            onChange={handlePersonalityChange}
          >
            <option value="" disabled>Select your personality</option>
            <option value="serious">Serious</option>
            <option value="extraverted">Extraverted</option>
            <option value="lively">Lively</option>
            <option value="responsible">Responsible</option>
            <option value="dependable">Dependable</option>
          </select>
            <button className="sign-in-register-button" onClick={handleRegister}>Register</button>
            <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
          </>
        ) : (
          <>
            <input type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
            <button className="sign-in-register-button" onClick={handleSignIn}>
              Sign In
            </button>
            <button
              className="create-account-button"
              onClick={() => setIsRegistering(true)}
            >
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
