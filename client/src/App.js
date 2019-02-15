import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import Table from './components/Table';
import SubmitPage from './components/SubmitPage';
import SubmissionPage from './components/SubmissionPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Table} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/SubmitPage/:id" component={SubmitPage} />
            <Route
              exact
              path="/SubmissionPage/:id"
              component={SubmissionPage}
            />
            <Route component={Table} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
