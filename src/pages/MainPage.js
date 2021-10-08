import React from "react";
import {Dropdown} from "react-bootstrap";
import Cookies from "js-cookie";
import Login from "../components/Login";

class MainPage extends React.Component {

    logout() {
        Cookies.remove('email')
        Cookies.remove('coordinatorRole')
        Cookies.remove('sessionCode');
        window.location.reload();
    }

    render() {
        return (
            <div>
                { Cookies.get('sessionCode') === undefined ?
                    <Login/>
                    :
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" style={{float: "right", borderRadius: '0'}}>
                            {Cookies.get('email')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.logout} >Wyloguj się!</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
        );
    }
}

export default MainPage;