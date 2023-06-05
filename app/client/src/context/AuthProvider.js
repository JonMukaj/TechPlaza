import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Implement your login function here
  const login = (userData) => {
    // Perform login logic and set the user state
    const decodedToken = jwt_decode(userData.accessToken);
    userData.account = decodedToken;
    // Save user to localStorage
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Implement your logout function here
  const logout = () => {
    // Perform logout logic and reset the user state
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
