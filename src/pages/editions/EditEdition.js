import React, { Component } from 'react';
import EditFile from '../../components/editions/EditFile';
import {withRouter} from "react-router-dom";
import Cookies from "js-cookie";

class EditionEdition extends Component {

    checkCookies() {
        if (Cookies.get('sessionCode') === undefined) {
            window.location.reload();
        }
    }

    render() {
        this.checkCookies();
        return (
            <div className="container">
                <EditFile id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default withRouter(EditionEdition);