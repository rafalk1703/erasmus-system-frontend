import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

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

    logout() {
        Cookies.remove('sessionCode');
        Cookies.remove('email');
    }

    render() {
        const user = this.state.user;
        return (
            <div>
                { user.logged || Cookies.get('sessionCode') !== undefined ?
                    <div>
                        <p>{`Jesteś zalogowany jako: ${Cookies.get('email')}`}</p>
                        <Link to="/logout">
                            <Button onClick={this.logout}>
                                Wyloguj się!
                            </Button>
                        </Link>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default MainPage;