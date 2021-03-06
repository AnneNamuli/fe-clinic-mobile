import React from 'react';
import ProjectInfiList from '../pages/ProjectInfiList';
import EditProjectInfo from '../pages/EditProjectInfo'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';


class Index extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/" component={Login} />
            <Route exact path="/ProjectInfiList" component={ProjectInfiList} />
            <Route exact path="/ProjectInfo/:id" component={EditProjectInfo} />
          </Switch>
        </App>
      </Router>
    );
  }
}
export default Index;