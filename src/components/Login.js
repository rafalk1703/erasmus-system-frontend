import React from "react";
import {Form, Button, Spinner} from "react-bootstrap";
import Cookies from "js-cookie";
import LoginService from "../services/LoginService";

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
                Cookies.set('email',this.state.email);
                this.props.history.push({
                    pathname: '/'
                });
                console.log('setting cookies ' + response.data);
                Cookies.set('sessionID',response.data);
            } else {
                throw new Error(response.status.toString());
            }
        }).catch( (error) => {
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
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email w domenie agh.edu.pl</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            disabled={this.state.loading}
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Hasło"
                            disabled={this.state.loading}
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button
                        block
                        disabled={ !this.validateForm() || loading }
                        type="submit">

                        { !loading && <span>Zaloguj</span> }
                        { loading && <Spinner as="span"
                                              animation="border"
                                              size="sm"
                                              role="status"
                                              aria-hidden="true"
                                              style={{marginRight: '20px'}} /> }
                        { loading && <span>Logowanie...</span> }
                    </Button>
                    {areCredentialsIsInvalid ? <p style={{color:"red"}}>Podane dane logowania są nieprawidłowe!</p> : ""}
                </Form>
            </div>
        );
    }
}

export default Login;