import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Notification from '../common/Notification';
import Button from '@material-ui/core/Button';
import ConfirmDelete from '../common/ConfirmDelete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add'
import { createBrowserHistory } from "history";


import format from 'string-format';
import PageBase from './PageBase';
import axios from "axios";

const history = createBrowserHistory({ forceRefresh: true });



const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
  }
});


export class ProjectInfiList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { bookings: null, open: false, deleteRecord: false, id: '', pgNo: 1, pageSize: 10, notify: false, message: '', error: false }
    this.deleteProjectInfo = this.deleteProjectInfo.bind(this);
    this.deleteAfterConfirmation = this.deleteAfterConfirmation.bind(this);
    this.editProjectInfo = this.editProjectInfo.bind(this);
    this.addProjectInfo = this.addProjectInfo.bind(this);
  }

  async componentDidMount(){
    const headers = {headers: { Authorization: "Bearer " + sessionStorage.getItem("token")} };
    const url = `http://localhost/api/v1/patient/Bookings`;
    const response = await axios.get(url, headers)
    this.setState({bookings: response.data})

  }

  deleteProjectInfo(id) {
    const headers = {headers: { Authorization: "Bearer " + sessionStorage.getItem("token")} };
    this.setState({ deleteRecord: true, id: id });
    axios.delete(`http://localhost/api/v1/patient/${id}`, headers)
  }
  editProjectInfo(id) {
    this.props.history.push(`/ProjectInfo/` + id);
  }
  deleteAfterConfirmation(deleteConfirmed) {
    this.setState({ deleteRecord: false });
    if (deleteConfirmed) {
      /* let selectedid =  this.state.id
        Create and call deleteProjectInfo action */
        this.showNotification("Appointment has been deleted");
        this.deleteProjectInfo(this.state.id)
    }
    this.setState({ id: '' });
    history.push({
      pathname: `/ProjectInfiList`,
    });
  }
  showNotification = (msg, err) => {
    if (err)
      this.setState({ notify: true, message: msg, error: true });
    else
      this.setState({ notify: true, message: msg, error: false });
  };

  handleNotificationClosed = () => {
    this.setState({
      notify: false
    });
  };

  addProjectInfo() {
    this.props.history.push(`/ProjectInfo`);
  }
  render() {
    const { classes } = this.props;
    const { notify, message, error } = this.state;
    const getBookings = this.state.bookings

    return (
      <PageBase title="Appointments" navigation="Project / Project List">
        <Button variant="fab" mini color="primary" aria-label="addd" className={classes.button} onClick={this.addProjectInfo}>
          <AddIcon />
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>id</CustomTableCell>
              <CustomTableCell>Patient Name</CustomTableCell>
              <CustomTableCell>Date of Birth</CustomTableCell>
              <CustomTableCell>Patent's Contact</CustomTableCell>
              <CustomTableCell>Clinic Name</CustomTableCell>
              <CustomTableCell>Clinic address</CustomTableCell>
              <CustomTableCell>Appointment Date</CustomTableCell>
              <CustomTableCell>Edit</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getBookings && getBookings.map(bookings => {
              return (
                <TableRow className={classes.row} key={bookings.id}>
                  <CustomTableCell>{bookings.id}</CustomTableCell>
                  <CustomTableCell>{bookings.full_name}</CustomTableCell>
                  <CustomTableCell>{bookings.date_of_birth}</CustomTableCell>
                  <CustomTableCell>{bookings.phone_number}</CustomTableCell>
                  <CustomTableCell>{bookings.name}</CustomTableCell>
                  <CustomTableCell>{bookings.address}</CustomTableCell>
                  <CustomTableCell>{bookings.appointment_date}</CustomTableCell>
                  <CustomTableCell>
                    <Button variant="fab" mini aria-label="edit" className={classes.button} onClick={() => this.editProjectInfo(bookings.id)}>
                      <EditIcon />
                    </Button>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Button variant="fab" mini color="secondary" aria-label="delete" className={classes.button} onClick={() => this.deleteProjectInfo(bookings.id)} >
                      <DeleteIcon />
                    </Button>
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ConfirmDelete resourceHeader="Delete Appointment ?" resourceSubject={format("Do you want to delete appointment for ID '{}'?", this.state.id)} onModalClose={this.deleteAfterConfirmation}
          openDeleteDialog={this.state.deleteRecord} />

        <Notification
          notify={notify}
          message={message}
          error={error}
          closed={this.handleNotificationClosed}
        />
      </PageBase>
    );
  }
}


ProjectInfiList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProjectInfiList);