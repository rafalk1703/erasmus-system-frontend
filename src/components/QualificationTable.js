import React from "react";
import QualificationService from '../services/QualificationService'

class QualificationTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: []
        }
    }

    componentDidMount() {
        QualificationService.getContracts().then(response => {
            this.setState({contracts: response.data.body})
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Qualification</h1>
            </div>
        );
    }
}

export default QualificationTable;