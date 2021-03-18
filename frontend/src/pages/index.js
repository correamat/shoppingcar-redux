import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Add from './Add';
import List from './List';
import Cart from './Cart';

function PrivateRoute({ component: Compoment, ...rest }){

	const { isAuthenticate } = useSelector(state => state.auth);

	return (
		<Route {...rest} render={props => (
			isAuthenticate ? (<Compoment {...props} />) : (<Redirect to={{pathname: '/', state: { from: props.location}}} />)
		)}/>
	)
}

export default () => (
	<Switch>
		<Route path="/list" component={List} />
		<PrivateRoute path="/add" component={Add} />
		<Route path="/cart" component={Cart} />
		<Redirect path="/" to="/list" />
	</Switch>
);
