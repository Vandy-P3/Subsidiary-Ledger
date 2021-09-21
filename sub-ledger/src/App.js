import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Auth from './utils/auth'
import Login from "./components/Login/Login.js";
import SignUp from "./components/Signup/Signup.js";
import HomePage from "./components/HomePage/HomePage.js";
import AssetForm from "./components/AssetForm/AssetForm.js";

function App() {
  return (
    <Router>
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Depreciation Ledger
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {Auth.loggedIn() ? (
                <>
                  <li>
                    <Link className="nav-link" to={"/addAsset"}>
                      Add Asset
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" onClick={Auth.logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
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
