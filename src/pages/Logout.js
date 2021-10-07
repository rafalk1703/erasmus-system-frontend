import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../components/Login";

class Logout extends React.Component {
    render() {
        return (
          <div className="Logout">
              <nav className="navbar navbar-expand-lg navbar-mainbg">
                  <NavLink className="navbar-brand navbar-logo" to="/" exact>
                      Erasmus System
                  </NavLink>
              </nav>
              <h3 style={{ color: '#8B0000', textAlign: 'center'}}>
                  Nastąpiło wylogowanie z systemu!
              </h3>
              <Login/>
          </div>
        );
    }
}

export default Logout;