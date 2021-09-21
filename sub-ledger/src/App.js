import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import HomePage from "./components/HomePage/HomePage";
import AssetForm from "./components/AssetForm/AssetForm";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/addAsset" component={AssetForm} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
