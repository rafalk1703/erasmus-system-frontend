import React from "react";
import Login from "../components/Login";

class Logout extends React.Component {
    render() {
        return (
          <div className="Logout">
              <h3 style={{ color: '#8B0000', textAlign: 'center'}}>
                  Nastąpiło wylogowanie z systemu!
              </h3>
              <Login/>
          </div>
        );
    }
}

export default Logout;