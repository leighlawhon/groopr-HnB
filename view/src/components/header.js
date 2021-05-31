import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});
class header extends Component {

  render() {
    return (
      <AppBar position="fixed" className={this.props.classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            TodoApp
							</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default (withStyles(styles)(header));