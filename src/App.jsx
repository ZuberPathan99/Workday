import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import Layout from './components/Layout';

const theme = createTheme();

function App() {
  const isLoggedIn = true; // Replace this with your actual login logic

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> */}
          <Route path="/*" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
