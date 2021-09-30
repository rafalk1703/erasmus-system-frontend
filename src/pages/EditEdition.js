import React, { Component } from 'react';
import EditFile from '../components/EditFile';

class EditionEdition extends Component {
    render() {
        return (
            <div className="container">
                <EditFile id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default EditionEdition;