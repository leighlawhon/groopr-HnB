import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import Quote from './quote';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';

const styles = ((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "calc(100% - 270px)",
    marginLeft: "auto"
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  submitButton: {
    display: 'block',
    color: 'black',
    textAlign: 'center',
    position: 'absolute',
    top: 14,
    right: 10
  },
  floatingButton: {
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  form: {
    width: '98%',
    marginLeft: 13,
    marginTop: theme.spacing(10)
  },
  toolbar: theme.mixins.toolbar,
  root: {
    minWidth: 470
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  pos: {
    marginBottom: 12
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
  },
  dialogeStyle: {
    maxWidth: '50%'
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      title: '',
      body: '',
      projectId: '',
      errors: [],
      open: false,
      uiLoading: true,
      buttonType: '',
      viewOpen: false,
      quoteOpen: false

    };

    this.deleteProjectHandler = this.deleteProjectHandler.bind(this);
    this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
    this.handleViewOpen = this.handleViewOpen.bind(this);
    this.handleQuoteOpen = this.handleQuoteOpen.bind(this);

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentWillMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('https://us-central1-grooper-hnb.cloudfunctions.net/api/projects')
      .then((response) => {
        console.log(response.data)
        this.setState({
          projects: response.data,
          uiLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteProjectHandler(data) {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    let projectId = data.project.projectId;
    axios
      .delete(`project/${projectId}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleEditClickOpen(data) {
    this.setState({
      title: data.project.title,
      body: data.project.body,
      projectId: data.project.projectId,
      buttonType: 'Edit',
      open: true
    });
  }

  handleViewOpen(data) {
    this.setState({
      title: data.project.title,
      body: data.project.body,
      viewOpen: true
    });
  }
  handleQuoteOpen(data) {
    this.setState({
      title: data.project.title,
      body: data.project.body,
      quoteOpen: true
    });
  }

  render() {
    const DialogTitle = withStyles(styles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const DialogContent = withStyles((theme) => ({

    }))(MuiDialogContent);

    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const { open, errors, viewOpen, quoteOpen } = this.state;

    const handleClickOpen = () => {
      this.setState({
        projectId: '',
        title: '',
        body: '',
        buttonType: '',
        open: true
      });
    };

    const handleSubmit = (event) => {
      authMiddleWare(this.props.history);
      event.preventDefault();
      const userTodo = {
        title: this.state.title,
        body: this.state.body
      };
      let options = {};
      if (this.state.buttonType === 'Edit') {
        options = {
          url: `/project/${this.state.projectId}`,
          method: 'put',
          data: userTodo
        };
      } else {
        options = {
          url: '/project',
          method: 'post',
          data: userTodo
        };
      }
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios(options)
        .then(() => {
          this.setState({ open: false });
          window.location.reload();
        })
        .catch((error) => {
          this.setState({ open: true, errors: error.response.data });
          console.log(error);
        });
    };
    const handleQuoteSubmit = (event) => {

    }
    const handleViewClose = () => {
      this.setState({ viewOpen: false });
    };

    const handleQuoteClose = () => {
      this.setState({ quoteOpen: false });
    };

    const handleClose = (event) => {
      this.setState({ open: false });
    };

    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
        </main>
      );
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <IconButton
            className={classes.floatingButton}
            color="primary"
            aria-label="Add Project"
            onClick={handleClickOpen}
          >
            <AddCircleIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Dialog fullScreen open={quoteOpen} onClose={handleQuoteClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleQuoteClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Project: {this.state.title}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleQuoteSubmit}
                  className={classes.submitButton}
                >
                  {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
                </Button>
              </Toolbar>
            </AppBar>
            <Quote />
          </Dialog>
          <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleSubmit}
              className={classes.submitButton}
            >
              {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
            </Button>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="projectTitle"
                    label="Todo Title"
                    name="title"
                    autoComplete="projectTitle"
                    helperText={errors.title}
                    value={this.state.title}
                    error={errors.title ? true : false}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="projectDetails"
                    label="Todo Details"
                    name="body"
                    autoComplete="projectDetails"
                    multiline
                    rows={25}
                    rowsMax={25}
                    helperText={errors.body}
                    error={errors.body ? true : false}
                    onChange={this.handleChange}
                    value={this.state.body}
                  />
                </Grid>
              </Grid>
            </form>
          </Dialog>

          <Grid container spacing={2}>
            {this.state.projects.map((project) => (
              <Grid item xs={12} sm={6} key={project.projectId}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {project.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {dayjs(project.createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`${project.body.substring(0, 65)}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => this.handleViewOpen({ project })}>
                      {' '}
											View{' '}
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ project })}>
                      Edit
										</Button>
                    <Button size="small" color="primary" onClick={() => this.deleteProjectHandler({ project })}>
                      Delete
										</Button>
                    <Button size="small" color="primary" onClick={() => this.handleQuoteOpen({ project })}>
                      Quote
										</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog
            onClose={handleViewClose}
            aria-labelledby="customized-dialog-title"
            open={viewOpen}
            fullWidth
            classes={{ paperFullWidth: classes.dialogeStyle }}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
              {this.state.title}
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                fullWidth
                id="projectDetails"
                name="body"
                multiline
                readOnly
                rows={1}
                rowsMax={25}
                value={this.state.body}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </DialogContent>
          </Dialog>
        </main >
      );
    }
  }
}

export default (withStyles(styles)(projects));