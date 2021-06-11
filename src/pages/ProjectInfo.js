import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form'
import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class ProjectInfo extends React.Component {
  render() {
    const { classes } = this.props;
    const { handleSubmit, submitting, onCancel } = this.props
    return (
      <form onSubmit={handleSubmit} >
        <div className={classes.container}>
          <div>
          <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
          </div>
          <div>
          <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
          </div>
          <div>
          <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
          </div>
          <div>
          <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />

          </div>
        </div>
         <div>
          <Button variant="raised" type="submit" color="primary" className={classes.button} disabled={submitting}>
            Save
      </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={onCancel}>
            Cancel
      </Button>
        </div>
      </form>
    );
  }
}

ProjectInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

// ProjectInfo = reduxForm({
//   form: 'projectInfo',
//   enableReinitialize: true
// })(ProjectInfo)


export default withStyles(styles)(ProjectInfo);