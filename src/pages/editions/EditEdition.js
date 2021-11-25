import React, { Component } from 'react';
import EditFile from '../../components/editions/EditFile';
import {withRouter} from "react-router-dom";

class EditionEdition extends Component {
    render() {
        return (
            <div className="container">
                <EditFile id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default withRouter(EditionEdition);