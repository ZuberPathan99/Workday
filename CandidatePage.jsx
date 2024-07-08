import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid, InputAdornment, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';

const CandidatePage = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const workExperienceYears = Array.from({ length: 41 }, (_, i) => i); // [0, 1, 2, ..., 40]
  const passingYears = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i); // [currentYear, currentYear-1, ..., 1980]

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    location: '',
    positionApplied: '',
    workExperience: '',
    currentPosition: '',
    currentEmployer: '',
    universityName: '',
    majorDegree: '',
    fieldOfStudy: '',
    yearOfPassing: '',
    skills: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    navigate('/login-signup');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Candidate Registration
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contact"
                required
                fullWidth
                id="contact"
                label="Contact"
                value={formData.contact}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                required
                fullWidth
                id="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="positionApplied"
                required
                fullWidth
                id="positionApplied"
                label="Position Applied For"
                value={formData.positionApplied}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="workExperience"
                required
                fullWidth
                id="workExperience"
                label="Work Experience"
                value={formData.workExperience}
                onChange={handleChange}
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {workExperienceYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year} {year === 1 ? 'year' : 'years'}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="currentPosition"
                required
                fullWidth
                id="currentPosition"
                label="Current Position"
                value={formData.currentPosition}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="currentEmployer"
                required
                fullWidth
                id="currentEmployer"
                label="Current Employer"
                value={formData.currentEmployer}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="universityName"
                required
                fullWidth
                id="universityName"
                label="University Name"
                value={formData.universityName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="majorDegree"
                required
                fullWidth
                id="majorDegree"
                label="Major Degree"
                value={formData.majorDegree}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fieldOfStudy"
                required
                fullWidth
                id="fieldOfStudy"
                label="Field of Study"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="yearOfPassing"
                required
                fullWidth
                id="yearOfPassing"
                label="Year of Passing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {passingYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="skills"
                required
                fullWidth
                id="skills"
                label="Skills"
                value={formData.skills}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CodeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<FileUploadIcon />}
              >
                Upload Resume
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {formData.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {formData.resume.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<DescriptionIcon />}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CandidatePage;
