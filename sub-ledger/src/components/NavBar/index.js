import React from 'react'
import Auth from '../../utils/auth'



function NavBar() {
    return (
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
    )
}

export default NavBar
