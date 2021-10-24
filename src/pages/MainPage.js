import React from "react";
import {Dropdown} from "react-bootstrap";
import Cookies from "js-cookie";
import Login from "../components/Login";
import MainDepartemt from "../components/MainDepartment";

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
                    <div className="container">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" style={{marginBottom: '30px'}}>
                            {Cookies.get('email')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.logout} >Wyloguj się!</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <MainDepartemt/>
                    </div>
                }
            </div>
        );
    }
}

export default MainPage;