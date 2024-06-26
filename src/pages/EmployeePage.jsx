import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Button, TextField, IconButton, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, 
  Select, InputLabel, FormControl
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

const EmployeePage = () => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [departments, setDepartments] = useState(() => {
    const savedDepartments = localStorage.getItem('departments');
    return savedDepartments ? JSON.parse(savedDepartments) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', email: '', department: '' });
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
  const [isDepartmentEdit, setIsDepartmentEdit] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const handleAddEmployee = () => {
    setIsEdit(false);
    setFormData({ name: '', role: '', email: '', department: '' });
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setIsEdit(true);
    setFormData(employee);
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.id !== id));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = () => {
    if (isEdit) {
      setEmployees((prevEmployees) =>
        prevEmployees.map(employee =>
          employee.id === selectedEmployee.id ? formData : employee
        )
      );
    } else {
      setEmployees((prevEmployees) => [...prevEmployees, { ...formData, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const handleAddDepartment = () => {
    setIsDepartmentEdit(false);
    setSelectedDepartment('');
    setIsDepartmentDialogOpen(true);
  };

  const handleEditDepartment = (department) => {
    setIsDepartmentEdit(true);
    setSelectedDepartment(department);
    setIsDepartmentDialogOpen(true);
  };

  const handleDeleteDepartment = (department) => {
    setDepartments((prevDepartments) => prevDepartments.filter(dep => dep !== department));
    setEmployees((prevEmployees) =>
      prevEmployees.map(employee =>
        employee.department === department ? { ...employee, department: '' } : employee
      )
    );
  };

  const handleDepartmentDialogClose = () => {
    setIsDepartmentDialogOpen(false);
  };

  const handleDepartmentFormSubmit = () => {
    if (isDepartmentEdit) {
      setDepartments((prevDepartments) =>
        prevDepartments.map(dep => (dep === selectedDepartment.old ? selectedDepartment.new : dep))
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map(employee =>
          employee.department === selectedDepartment.old ? { ...employee, department: selectedDepartment.new } : employee
        )
      );
    } else {
      setDepartments((prevDepartments) => [...prevDepartments, selectedDepartment]);
    }
    setIsDepartmentDialogOpen(false);
  };

  const handleDepartmentSearchChange = (e) => {
    setDepartmentSearchTerm(e.target.value);
  };

  const filteredDepartments = departments.filter(department =>
    department.toLowerCase().includes(departmentSearchTerm.toLowerCase())
  );

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmployeeCount = (department) => {
    return employees.filter(employee => employee.department === department).length;
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>Employee Directory</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddEmployee}
          >
            Add Employee
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {filteredEmployees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="div">{employee.name}</Typography>
                <Typography variant="body2" color="textSecondary">{employee.role}</Typography>
                <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
                <Typography variant="body2" color="textSecondary">Department: {employee.department}</Typography>
                <div style={{ marginTop: 10 }}>
                  <IconButton color="primary" onClick={() => handleEditEmployee(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteEmployee(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: 40 }}>Department and Team Management</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search departments..."
            value={departmentSearchTerm}
            onChange={handleDepartmentSearchChange}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddDepartment}
            style={{ marginBottom: 20 }}
          >
            Add Department
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredDepartments.map((department, index) => (
          <Grid item xs={12} sm={6} md={4} key={department}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">{department}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Employees: {getEmployeeCount(department)}
                </Typography>
                <div style={{ marginTop: 10 }}>
                  <IconButton color="primary" onClick={() => handleEditDepartment(department)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteDepartment(department)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{isEdit ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the employee details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              label="Department"
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department}>{department}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">{isEdit ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDepartmentDialogOpen} onClose={handleDepartmentDialogClose}>
        <DialogTitle>{isDepartmentEdit ? 'Edit Department' : 'Add Department'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the department name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Department"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDepartmentDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleDepartmentFormSubmit} color="primary">{isDepartmentEdit ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeePage;

