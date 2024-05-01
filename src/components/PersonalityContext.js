import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

const PersonalityContext = createContext();

export const PersonalityProvider = ({ children }) => {
  const [userPersonality, setUserPersonality] = useState('');

  const setPersonality = (personality) => {
    setUserPersonality(personality);
  };

  return (
    <PersonalityContext.Provider value={{ userPersonality, setPersonality }}>
      {children}
    </PersonalityContext.Provider>
  );
};

export const usePersonality = () => {
  const context = useContext(PersonalityContext);
  if (!context) {
    throw new Error('usePersonality must be used within a PersonalityProvider');
  }
  return context;
};