import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Provider } from "react-redux";
import { store, history } from './helpers'

import './assets/css/black-dashboard-react.css';
import './assets/css/core/main.css';
import './assets/css/daygrid/main.css';

import AdminLayout from "./layouts/Admin/Admin.jsx";
import PostLayout from "./layouts/Post/Post.jsx";
import Error from './layouts/Error.jsx'
import '../node_modules/react-redux-notify/dist/ReactReduxNotify.css';

ReactDOM.render( 
<Provider store={store}> 		
	<Router history={history}>
	  <Switch>		
      	<Route exact path="/login" render={props => <PostLayout {...props} />} />
      	<Route exact path="/" render={() => <Redirect to="/admin/dashboard" />} />
      	<Route exact path="/admin" render={() => <Redirect to="/admin/dashboard" />} /> 
      	<PrivateRoute path="/admin" component={AdminLayout} />       	
      	<Route component={Error} />
	  </Switch>
	</Router>
</Provider> ,
	document.getElementById('root')	
);