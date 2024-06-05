import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  Container,
  Avatar,
  Paper,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    marginBottom: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  icon: {
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  announcement: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
      <Container>
        <Grid container spacing={4} className={classes.toolbar}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <PeopleIcon className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h2">
                  Employee Management
                </Typography>
                <Typography>
                  Manage employee data, roles, and permissions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <AssessmentIcon className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h2">
                  Reports
                </Typography>
                <Typography>
                  Access detailed reports and analytics.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <WorkIcon className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h2">
                  Job Openings
                </Typography>
                <Typography>
                  Manage job postings and applications.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <EventNoteIcon className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h2">
                  Calendar
                </Typography>
                <Typography>
                  View and manage company events and schedules.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <AnnouncementIcon className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h2">
                  Announcements
                </Typography>
                <Typography>
                  Stay updated with the latest company announcements.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Paper className={classes.announcement}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.avatar}>A</Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">Company Announcement</Typography>
              <Typography variant="body2">
                This is a brief announcement about something important happening
                in the company. Stay tuned for more updates.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default HomePage;
