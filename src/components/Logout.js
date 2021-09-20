import React from "react";
import Login from "./Login";

class Logout extends React.Component {
    render() {
        return (
          <div className="Logout">
              <h1>Nastąpiło wylogowanie z systemu</h1>
              <Login/>
          </div>
        );
    }
}

export default Logout;