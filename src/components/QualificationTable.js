import React from "react";
import {Card, CardColumns, Row, Col, Button, Container, ProgressBar} from "react-bootstrap";
import QualificationService from '../services/QualificationService';
import "./QualificationTable.css";

class QualificationTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: [],
            studentsRegistrations: {}
        }
    }

    componentDidMount() {
        QualificationService.getContracts().then(response => {
            this.setState({contracts: response.data.contracts,
                                studentsRegistrations: response.data.studentsRegistrations}
            )
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const isConflict = (registration) => {
            if (!registration.isAccepted) {
                return false;
            }
            const studentsRegistrations = this.state.studentsRegistrations[registration.student.id];
            let acceptedRegistrationsAmount = 0;
            for (var i=0; i<studentsRegistrations.length; i++) {
                this.state.contracts.map( contract => {
                    contract.registrations.map( reg => {
                        if (reg.id === studentsRegistrations[i] && reg.isAccepted) {
                            acceptedRegistrationsAmount++;
                        }
                    })
                })
            }
            return acceptedRegistrationsAmount > 1;
        }

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
                                                                  style={{
                                                                      backgroundColor: isConflict(registration) ? '#ff9999' : registration.isAccepted ? '#d0f0c0' : '#FFFFFF'
                                                                  }}>
                                                                <div id="reg-div">
                                                                    <div className='square'
                                                                         style={{
                                                                             backgroundColor: (registration.priority === 1) ? '#FFD700' :
                                                                                 (registration.priority === 2) ? '#C0C0C0' : '#966919'
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
                                                                    <Button variant={registration.isAccepted ? "danger" : "success"}
                                                                            id="plus-minus"
                                                                            disabled={contract.acceptedStudentsAmount >= contract.vacancies && !registration.isAccepted}
                                                                            onClick={() => {
                                                                                if (contract.acceptedStudentsAmount < contract.vacancies || registration.isAccepted ) {
                                                                                    if (registration.isAccepted) {
                                                                                        contract.acceptedStudentsAmount--;
                                                                                    } else {
                                                                                        contract.acceptedStudentsAmount++;
                                                                                    }
                                                                                    registration.isAccepted = !registration.isAccepted
                                                                                    this.setState({contracts: this.state.contracts})
                                                                                }
                                                                            }}>
                                                                        <h5>{registration.isAccepted ? '-' : '+'}</h5>
                                                                    </Button>
                                                                </div>
                                                            </Card>
                                                    )
                                                }
                                            </CardColumns>
                                            <Card.Footer>
                                                    <ProgressBar id="progress"
                                                                 variant={contract.acceptedStudentsAmount < contract.vacancies ? "warning" : "success"}
                                                                 now={contract.acceptedStudentsAmount / contract.vacancies * 100}
                                                                 label={`${contract.acceptedStudentsAmount} z ${contract.vacancies}`}
                                                    />
                                            </Card.Footer>
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