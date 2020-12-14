import React from 'react';
import './App.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Home from './components/Home';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h5'>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
            <div style={{marginTop: 10}}>
              <Link to="/" style={{padding: 10}}>Home</Link>{' '}
              <Link to="/customers" style={{padding: 10}}>Customers</Link>{' '}
              <Link to="/trainings" style={{padding: 10}}>Trainings</Link>{' '}
              <Switch>
                <Route exact path="/" component={Home}>
                  <Home />
                </Route>
                <Route path="/customers" component={Customers}>
                  <Customers />
                </Route>
                <Route path="/trainings" component={Trainings}>
                  <Trainings />
                </Route>
                <Route path='*' render={() => <h1> Page not found</h1>}/>
              </Switch>
            </div>
          </BrowserRouter>
    </div>
  );
}

export default App;
