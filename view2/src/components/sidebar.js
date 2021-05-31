import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from 'react-router-dom';
const drawerWidth = 240;
const styles = ((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20
  },
}));


class sidebar extends Component {
  logoutHandler = (event) => {
    localStorage.removeItem('AuthToken');
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      profilePicture: '',
      uiLoading: true,
      imageLoading: false
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <center>
          <Avatar src={this.props.profilePicture} className={classes.avatar} />
          <p>
            {' '}
            {this.props.firstName} {this.props.lastName}
          </p>
        </center>
        <Divider />
        <List>
          <ListItem button key="Project" onClick={this.loadProjectPage}>
            <ListItemIcon>
              {' '}
              <NotesIcon />{' '}
            </ListItemIcon>
            <Link to="/projects" >Projects </Link>
          </ListItem>

          <ListItem button key="Account" onClick={this.loadAccountPage}>
            <ListItemIcon>
              {' '}
              <AccountBoxIcon />{' '}
            </ListItemIcon>
            <Link to="/account" >Account </Link>
          </ListItem>

          <ListItem button key="Logout" onClick={this.logoutHandler}>
            <ListItemIcon>
              {' '}
              <ExitToAppIcon />{' '}
            </ListItemIcon>
            <Link to="/login">Log Out</Link>
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default (withStyles(styles)(sidebar));