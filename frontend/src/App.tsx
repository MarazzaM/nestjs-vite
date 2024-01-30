import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Chat from "./routes/Chat";
import ProtectedRoute from "./components/ui/auth/ProtectedRoute";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      // Make a request to the server to validate the token
      fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // Token is valid, set the user in local state
            setUser(true); // You can set the actual user data if available
            console.log("User authenticated");
          } else {
            // Token validation failed, handle unauthorized access
            console.error("User not authenticated");
            throw new Error("Unauthorized");
          }
        })
        .catch((error) => {
          console.error("User not authenticated", error);
          // Handle unauthorized access, clear token, log out user, etc.
          Cookies.remove("accessToken");
        })
        .finally(() => {
          // Set loading to false once authentication check is complete
          setLoading(false);
        });
    } else {
      // No token found, set loading to false
      setLoading(false);
    }
  }, []);

  if (loading) {
    // Render a loading indicator or component while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAllowed={user} redirectTo="/login">
              <Chat />
            </ProtectedRoute>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
