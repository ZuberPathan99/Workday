import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  employeeCard: {
    marginBottom: theme.spacing(3),
  },
}));

const EmployeeManagement = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEmployee({ name: '', email: '', jobTitle: '' });
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, newEmployee]);
    handleClose();
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // You can fetch employee data from an API or data source here
    const initialEmployees = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        jobTitle: 'Software Engineer',
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        jobTitle: 'Human Resources Manager',
      },
    ];
    setEmployees(initialEmployees);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Employee Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        className={`${classes.drawer} ${
          mobileOpen ? classes.drawerOpen : classes.drawerClose
        }`}
        classes={{
          paper: `${classes.drawerOpen} ${
            mobileOpen ? classes.drawerOpen : classes.drawerClose
          }`,
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add Employee
            </Button>
          </Grid>
          {employees.map((employee, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.employeeCard}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="employee">
                      {employee.name.charAt(0)}
                    </Avatar>
                  }
                  title={employee.name}
                  subheader={employee.jobTitle}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Email: {employee.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              value={newEmployee.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              value={newEmployee.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="jobTitle"
              label="Job Title"
              fullWidth
              value={newEmployee.jobTitle}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddEmployee} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default EmployeeManagement;