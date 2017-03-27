import React from 'react';
import { Router, Route } from 'react-router';
import App from '../pages/App';
import RepoInformation from '../pages/repoinformation';
import {browserHistory} from 'react-router';

const Routes = (props) => (
  <Router {...props}>
  	<Route path="/"  component={App} /> 
  	<Route path="/repoinfo" component={RepoInformation} />
  </Router>
);

export default Routes;