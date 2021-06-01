import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import Account from '../components/account';
import Projects from '../components/projects';

import CssBaseline from '@material-ui/core/CssBaseline';

import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
  root: {
    display: 'flex'
  },

  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
  },
  toolbar: theme.mixins.toolbar
});

class home extends Component {
  state = {
    render: false
  };

  loadAccountPage = (event) => {
    this.setState({ render: true });
  };

  loadProjectPage = (event) => {
    this.setState({ render: false });
  };





  render() {
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <div>{this.state.render ? <Account /> : <Projects />}</div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(home);
