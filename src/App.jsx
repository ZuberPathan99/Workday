import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import Layout from './components/Layout';

function App() {
  const isLoggedIn = true; // Replace this with your actual login logic

  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/*" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
