import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class projectForm extends Component {
  render() {
    return (
      <form className={this.props.classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectName"
              label="Name"
              name="projectName"
              autoComplete="projectName"
              helperText={this.props.errors.projectName}
              value={this.props.projectName}
              error={this.props.errors.projectName ? true : false}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectLocation"
              label="Location"
              name="location"
              autoComplete="projectLocation"
              helperText={this.props.errors.location}
              error={this.props.errors.location ? true : false}
              onChange={this.handleChange}
              value={this.props.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectArchitect"
              label="Architect"
              name="architect"
              autoComplete="projectArchitect"
              helperText={this.props.errors.architect}
              error={this.props.errors.architect ? true : false}
              onChange={this.handleChange}
              value={this.props.architect}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectBidDate"
              label="Bid Date"
              name="bidDate"
              autoComplete="projectBidDate"
              helperText={this.props.errors.bidDate}
              error={this.props.errors.bidDate ? true : false}
              onChange={this.handleChange}
              value={this.props.bidDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectDwgDate"
              label="Dwg Date"
              name="dwgDate"
              autoComplete="projectDwgDate"
              helperText={this.props.errors.dwgDate}
              error={this.props.errors.dwgDate ? true : false}
              onChange={this.handleChange}
              value={this.props.dwgDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectNotes"
              label="Notes"
              name="notes"
              autoComplete="projectNotes"
              helperText={this.props.errors.notes}
              error={this.props.errors.notes ? true : false}
              onChange={this.handleChange}
              value={this.props.notes}
            />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="projectQuotedBy"
                label="Quoted By"
                name="quotedBy"
                autoComplete="projectQuotedBy"
                helperText={this.props.errors.quotedBy}
                error={this.props.errors.quotedBy ? true : false}
                onChange={this.handleChange}
                value={this.props.quotedBy}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="projectCreatedAt"
                label="Created At"
                name="createdAt"
                autoComplete="projectCreatedAt"
                helperText={this.props.errors.createdAt}
                error={this.props.errors.createdAt ? true : false}
                onChange={this.handleChange}
                value={this.props.createdAt}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default projectForm;