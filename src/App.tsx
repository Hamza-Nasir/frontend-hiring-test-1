import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import { Navbar } from './components';
import { Login, Dashboard } from './pages';
import AuthProvider from "./providers/AuthProvider"
import AuthContext from './contexts/AuthContext';
import Protected from './routes/Protected';

function App() {


  return (
    <>
      <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <Protected component={Dashboard} />
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
    </>
    
  );
}


export default App;