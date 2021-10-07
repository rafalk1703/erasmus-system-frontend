import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../components/Login";
import Navbar2 from "../components/Navbar2";

class MainPage extends React.Component {

    static defaultProps = {
        user: {
            email: "",
            logged: false
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: Cookies.get('email'),
                logged: Cookies.get('email') !== undefined
            }
        };
    }

    render() {
        const user = this.state.user;
        return (
            <div>
                { !user.logged && Cookies.get('sessionCode') === undefined ?
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-mainbg">
                            <NavLink className="navbar-brand navbar-logo" to="/" exact>
                                Erasmus System
                            </NavLink>
                        </nav>
                        <Login/>
                    </div>
                    : ""
                }
                { user.logged || Cookies.get('sessionCode') !== undefined ?
                    <Navbar2/>
                    : ""
                }
            </div>
        );
    }
}

export default MainPage;