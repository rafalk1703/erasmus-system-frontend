import React from "react";
import {Form, Button, Spinner} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import LoginService from "../services/LoginService";
import "./Login.css"

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: "",
            password: "",
            areCredentialsIsInvalid: false
        };
    }

    validateForm() {
        return (this.state.email.length>0 && this.state.password.length>0);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        let loginData = {
            "email": this.state.email,
            "password": this.state.password
        };
        LoginService.login(loginData).then(response => {
            this.setState({loading: false});
            if (response.status === 200) {
                Cookies.set('email', this.state.email);
                Cookies.set('coordinatorRole', response.data.coordinatorRole);
                Cookies.set('sessionCode', response.data.sessionCode);
                console.log('setting cookies ' + response.data.sessionCode);
                window.location.reload();
            } else {
                throw new Error(response.status.toString());
            }
        }).catch( (error) => {
            this.setState({loading: false});
            if (error.response.status === 401) {
                this.setState({areCredentialsIsInvalid: true});
            }
            console.log('error ' + error);
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        const loading = this.state.loading;
        const areCredentialsIsInvalid = this.state.areCredentialsIsInvalid;
        return (
            <div>
                <h1>Logowanie</h1>
                <div className="Login">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group id="field" controlId="email">
                            <Form.Control
                                type="text"
                                placeholder="Adres e-mail w domenie agh.edu.pl"
                                disabled={this.state.loading}
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group id="field" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder="Hasło"
                                disabled={this.state.loading}
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button
                            id="submit"
                            block
                            disabled={ !this.validateForm() || loading }
                            type="submit">

                            { !loading && <span id="text">Zaloguj się</span> }
                            { loading && <Spinner as="span"
                                                  animation="border"
                                                  size="sm"
                                                  role="status"
                                                  aria-hidden="true" /> }
                            { loading && <span>Logowanie...</span> }
                        </Button>
                        {areCredentialsIsInvalid ? <p id="message">Podane dane logowania są nieprawidłowe!</p> : ""}
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);