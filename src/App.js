import React from 'react';
import './App.css';

import PumpState from './context/pump/PumpState';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pump from './components/Pump';
import Login from './Pages/Login';
import Camera from './Pages/Camera';
import AuthState from './context/auth/AuthState';
import PrivateRoute from './routing/PrivateRoute';

function App() {
	return (
		<AuthState>
			<PumpState>
				<div className="App">
					<Router>
						<Navbar></Navbar>
						<Switch>
							<PrivateRoute exact path="/" component={Pump}></PrivateRoute>
							<PrivateRoute
								exact
								path="/camera"
								component={Camera}
							></PrivateRoute>
							<Route exact path="/login" component={Login}></Route>
						</Switch>
					</Router>
				</div>
			</PumpState>
		</AuthState>
	);
}

export default App;
