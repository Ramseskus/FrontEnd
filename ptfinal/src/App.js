import React from "react";
import "./App.css";
import CustomerList from "./components/CustomerList";
import Trainings from "./components/Trainings";
import Home from "./components/Home";
import CalendarPage from "./components/BigCalendar";

import Button from "@material-ui/core/Button";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <img src={"gorillalogo.svg"} className="gorillalogo"></img>
          <h1>Gorillas Training</h1>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div style={{ marginTop: 10 }}>
          <Link to="/">
            <Button style={{ padding: 10 }}>Home</Button>
          </Link>{" "}
          <Link to="/customers">
            <Button style={{ padding: 10 }}>Customers</Button>
          </Link>{" "}
          <Link to="/trainings">
            <Button style={{ padding: 10 }}>Trainings</Button>
          </Link>{" "}
          <Link to="/calendar">
            <Button style={{ padding: 10 }}>Calendar</Button>
          </Link>{" "}
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/customers" component={CustomerList}></Route>
            <Route path="/trainings" component={Trainings}></Route>
            <Route path="/calendar" component={CalendarPage}></Route>
            <Route path="*" render={() => <h1> Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
