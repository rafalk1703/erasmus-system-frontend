import React from "react";
import {Card, CardColumns, Row, Col, Button, Container} from "react-bootstrap";
import QualificationService from '../services/QualificationService';
import "./QualificationTable.css";

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
                <h1 id='header'>Kwalifikacja Studentów</h1>
                <Container id="container">
                    <Row xs={1} md={3} className="g-4">
                        {
                            this.state.contracts.map(
                                contract =>
                                    <Col>
                                        <Card bg={'light'}>
                                            <Card.Header>
                                                <h4 className='text-center'>{contract.erasmusCode}</h4>
                                                <Container>
                                                    <Row className="justify-content-md-center">
                                                        <Col md="auto" xs="auto">{contract.contractsCoordinator.name}</Col>
                                                        <Col md="auto" xs="auto">ilość miejsc: {contract.vacancies}</Col>
                                                    </Row>
                                                </Container>
                                            </Card.Header>
                                            <CardColumns>
                                                {
                                                    contract.registrations.map(
                                                        registration =>
                                                            <Card key={registration.id} id="reg-card"
                                                                  style={{backgroundColor: registration.isAccepted ? '#d0f0c0' : '#FFFFFF'}}>
                                                                <div id="reg-div">
                                                                    <div className='square'
                                                                         style={{
                                                                             backgroundColor: (registration.priority == '1') ? '#FFD700' :
                                                                                 (registration.priority == '2') ? '#C0C0C0' : '#966919'
                                                                         }}>
                                                                        <h5 id="square-priority">{registration.priority}</h5>
                                                                    </div>
                                                                    <div id="student-data">
                                                                        <h5>
                                                                            {registration.student.name} {registration.student.surname}
                                                                        </h5>
                                                                        <h6>
                                                                            {registration.student.department}, {registration.student.field}, {registration.student.year} rok
                                                                        </h6>
                                                                    </div>
                                                                    <Button variant={registration.isAccepted ? "danger" : "success"} id="plus-minus"
                                                                            onClick={() => {
                                                                                registration.isAccepted = !registration.isAccepted
                                                                                this.setState({contracts: this.state.contracts})}
                                                                            }>
                                                                        {registration.isAccepted ? '-' : '+'}
                                                                    </Button>
                                                                </div>
                                                            </Card>
                                                    )
                                                }
                                            </CardColumns>
                                        </Card>
                                    </Col>
                            )
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default QualificationTable;