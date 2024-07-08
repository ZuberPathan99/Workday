import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, MenuItem, Alert, InputAdornment, useMediaQuery, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';

const roles = ['HR', 'Admin', 'Employee'];
const genders = ['Male', 'Female', 'Other'];

const AuthForm = ({ type, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    role: false,
    fullName: false,
    dateOfBirth: false,
    gender: false,
    nationality: false,
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setFullName('');
    setDateOfBirth('');
    setGender('');
    setNationality('');
    setTouched({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
      role: false,
      fullName: false,
      dateOfBirth: false,
      gender: false,
      nationality: false,
    });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateUsername = (username) => username.trim() !== '';
  const validateRole = (role) => roles.includes(role);
  const validateFullName = (fullName) => fullName.trim() !== '';
  const validateDateOfBirth = (dateOfBirth) => dateOfBirth.trim() !== '';
  const validateGender = (gender) => genders.includes(gender);
  const validateNationality = (nationality) => nationality.trim() !== '';

  const handleBlur = (field) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (type === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!validateUsername(username) || !validateEmail(email) || !validatePassword(password) || !validateRole(role) || !validateFullName(fullName) || !validateDateOfBirth(dateOfBirth) || !validateGender(gender) || !validateNationality(nationality)) {
        setError('Please fill in all fields correctly');
        return;
      }

      const signupData = { username, email, password, role, fullName, dateOfBirth, gender, nationality };
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(signupData);
      localStorage.setItem('users', JSON.stringify(users));

      console.log('Signup successful:', signupData);
      setSuccess('Signup successful');
      clearFields();
      setTimeout(() => navigate('/login'), 500);
    } else if (type === 'login') {
      if (!validateUsername(username) || !validatePassword(password)) {
        setError('Please fill in all fields correctly');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        console.log('Login successful:', { username, password });
        setIsLoggedIn(true);
        setSuccess('Login successful');
        localStorage.setItem('currentUser', JSON.stringify(user));
        clearFields();
        setTimeout(() => navigate('/layout'), 500);
      } else {
        console.log('Invalid login data:', { username, password });
        setError('Invalid username or password');
      }
    }
  };

  const switchMode = () => navigate(type === 'login' ? '/signup' : '/login');
  const navigateToCandidatePage = () => navigate('/candidate-registration');

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {type === 'login' ? 'Login' : 'Signup'}
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{success}</Alert>}
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {type === 'signup' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.fullName && !validateFullName(fullName)}
                    helperText={touched.fullName && !validateFullName(fullName) ? 'Full Name is required' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.email && !validateEmail(email)}
                    helperText={touched.email && !validateEmail(email) ? 'Invalid email address' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    onBlur={() => handleBlur('dateOfBirth')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CakeIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.dateOfBirth && !validateDateOfBirth(dateOfBirth)}
                    helperText={touched.dateOfBirth && !validateDateOfBirth(dateOfBirth) ? 'Date of Birth is required' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onBlur={() => handleBlur('gender')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WcIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.gender && !validateGender(gender)}
                    helperText={touched.gender && !validateGender(gender) ? 'Please select a valid gender' : ''}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nationality"
                    label="Nationality"
                    name="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    onBlur={() => handleBlur('nationality')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.nationality && !validateNationality(nationality)}
                    helperText={touched.nationality && !validateNationality(nationality) ? 'Nationality is required' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onBlur={() => handleBlur('role')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentIndIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.role && !validateRole(role)}
                    helperText={touched.role && !validateRole(role) ? 'Please select a valid role' : ''}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                error={touched.username && !validateUsername(username)}
                helperText={touched.username && !validateUsername(username) ? 'Username is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                error={touched.password && !validatePassword(password)}
                helperText={touched.password && !validatePassword(password) ? 'Password must be at least 6 characters' : ''}
              />
            </Grid>
            {type === 'signup' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={touched.confirmPassword && password !== confirmPassword}
                  helperText={touched.confirmPassword && password !== confirmPassword ? 'Passwords do not match' : ''}
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={type === 'login' ? <LoginIcon /> : <PersonAddIcon />}
          >
            {type === 'login' ? 'Login' : 'Signup'}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {type === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {type === 'login' && (
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/candidate-registration')}
        >
          Go to Candidate Registration
        </Button>
      )}
    </Container> 
  );
};

export default AuthForm;

