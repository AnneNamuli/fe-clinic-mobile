import React from "react";
import PropTypes from "prop-types";
// import ProjectInfo from './ProjectInfo';
import { reset } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { createBrowserHistory } from "history";
import CardContent from "@material-ui/core/CardContent";
import Notification from "../common/Notification";

const history = createBrowserHistory({ forceRefresh: true });



const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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

export class EditProjectInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateProjectInfo = this.updateProjectInfo.bind(this);
    this.redirectToProjectInfoList = this.redirectToProjectInfoList.bind(this);
    this.state = { notify: false, message: "", error: false };
  }

  componentDidMount() {
    /*  let id =this.props.id
        Create and call getProjectInfobyid action*/
    this.showNotification("Load!! Create and call getProjectInfobyid action");
  }

  updateProjectInfo(values) {
    /*  Create and call updateProjectInfo action */
    this.showNotification("Update!! Create and call updateProjectInfo action");
  }

  redirectToProjectInfoList() {
    this.props.dispatch(reset("projectInfo"));
    this.props.history.push(`/ProjectInfiList`);
  }

  showNotification = (msg, err) => {
    if (err) this.setState({ notify: true, message: msg, error: true });
    else this.setState({ notify: true, message: msg, error: false });
  };

  handleNotificationClosed = () => {
    this.setState({
      notify: false,
    });
  };

  render() {
    const { notify, message, error } = this.state;

    const { handleSubmit, classes, onCancel, submitting } = this.props;

    console.log(">>>>>>>", this.props);
    return (
      <div>
        <Card>
          <CardContent>
            <h1>Edit Appointment</h1>
          </CardContent>
          <form onSubmit={handleSubmit}>
            <div className={classes.container}>
            <div>
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Patient Name"
                  defaultValue={this.props.location.state[0].full_name}
                />
              </div>
              <div>
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Clinic Name"
                  defaultValue={this.props.location.state[0].name}
                />
              </div>
              <div>
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Clinic Address"
                  defaultValue={this.props.location.state[0].address}
                />
              </div>
              <div>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2021-11-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            </div>
           
          </form>
          {/* <ProjectInfo
                        onSubmit={this.updateProjectInfo}
                        onCancel={this.redirectToProjectInfoList}
                        editMode
                    /> */}
          <br />
          <br />
          <div>
            <Button
              variant="raised"
              type="submit"
              color="primary"
              className={classes.button}
              disabled={submitting}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onCancel}
              onClick={()=>{history.push('/ProjectInfiList')}}
            >
              Cancel
            </Button>
          </div>
        </Card>

        <Notification
          notify={notify}
          message={message}
          error={error}
          closed={this.handleNotificationClosed}
        />
      </div>
    );
  }
}

EditProjectInfo.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

EditProjectInfo.contextTypes = {
  router: PropTypes.object,
};

export default withStyles(styles)(EditProjectInfo);
