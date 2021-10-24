import React from "react";
import {Card, CardColumns, Row, Col, Button, Container, ProgressBar, FormCheck, Badge, Nav} from "react-bootstrap";
import Cookies from "js-cookie";
import QualificationService from '../services/QualificationService';
import EditionService from "../services/EditionService";
import "./Qualification.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CoordinatorsService from "../services/CoordinatorsService";
import 'react-notifications/lib/notifications.css';


class QualificationContracts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: [],
            studentsRegistrations: {},
            markedRegistrationsFlags: {},
            isSthMarked: false,
            selectedDegree: "1st"
        }
        this.saveQualification = this.saveQualification.bind(this);
    }

    saveQualification() {

        const registrationsBody = [];

        this.state.contracts.map( contract => {
            contract.registrations.map( registration => {
                let reg = {
                    "registrationId": registration.id,
                    "acceptanceStatus": registration.isAccepted
                };
                registrationsBody.push(reg);
            });
        });

        let body = {
            "sessionCode": Cookies.get('sessionCode'),
            "registrations": registrationsBody
        };

        NotificationManager.success('Zapisano twój wybór', 'Sukces!');
        QualificationService.saveQualification(body);
        CoordinatorsService.acceptContracts();
    }

    componentDidMount() {
        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    QualificationService.getQualificationByEdition(response1.data.id).then((response) => {
                        this.setState({
                            contracts: response.data.contracts,
                            studentsRegistrations: response.data.studentsRegistrations
                        })
                    });
                });
            })()
        } catch (err) {}
    }

    render() {
        const markStudentRegistrations = (studentId) => {
            this.state.studentsRegistrations[studentId].registrationsIds.map( registrationId => {
                this.state.markedRegistrationsFlags[registrationId] = !this.state.markedRegistrationsFlags[registrationId];
            })
            this.setState({
                markedRegistrationsFlags: this.state.markedRegistrationsFlags,
                isSthMarked: !this.state.isSthMarked
            });
        }

        return (
            <div>
                <NotificationContainer/>
                <h1 id='header'>Kwalifikacja Studentów</h1>
                <Nav variant="tabs" className="flex-row" id="degree-switch" defaultActiveKey="1st">
                    <Nav.Item>
                        <Nav.Link eventKey="1st" onSelect={() => this.setState({selectedDegree: "1st"})}>
                            I stopień
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2st" onSelect={() => this.setState({selectedDegree: "2st"})}>
                            II stopień
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="3st" onSelect={() => this.setState({selectedDegree: "3st"})}>
                            III stopień
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Button variant="outline-primary" id="submit-button" type="submit" onClick={this.saveQualification}>
                    Zapisz zmiany
                </Button>
                <Container id="container">
                    <Row xs={1} md={3} className="g-4">
                        {
                            this.state.contracts.filter(contract => contract.degree === this.state.selectedDegree).map(
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
                                                            <Card key={registration.id}
                                                                  id="reg-card"
                                                                  style={{
                                                                      backgroundColor:
                                                                          this.state.markedRegistrationsFlags[registration.id] ? '#FFDAB9' :
                                                                              registration.isAccepted ? '#d0f0c0' : '#FFFFFF'
                                                                  }}>
                                                                <div id="reg-div">
                                                                    <div className='square'
                                                                         style={{
                                                                             backgroundColor:
                                                                                 (registration.priority === 1) ? '#FFD700' :
                                                                                     (registration.priority === 2) ? '#C0C0C0' : '#966919'
                                                                         }}>
                                                                        <h5 id="square-priority">{registration.priority}</h5>
                                                                    </div>
                                                                    <div id="select-box">
                                                                        <FormCheck type={'checkbox'}
                                                                                   checked={this.state.markedRegistrationsFlags[registration.id]}
                                                                                   disabled={!this.state.markedRegistrationsFlags[registration.id] && this.state.isSthMarked}
                                                                                   onChange={ () => {markStudentRegistrations(registration.student.id)} }
                                                                        />
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
                                                                                        this.state.studentsRegistrations[registration.student.id].acceptedAmount--;
                                                                                    } else {
                                                                                        contract.acceptedStudentsAmount++;
                                                                                        this.state.studentsRegistrations[registration.student.id].acceptedAmount++;
                                                                                    }
                                                                                    registration.isAccepted = !registration.isAccepted
                                                                                    this.setState({
                                                                                        contracts: this.state.contracts,
                                                                                        studentsRegistrations: this.state.studentsRegistrations
                                                                                    })
                                                                                }
                                                                            }}>
                                                                        <h5>{registration.isAccepted ? '-' : '+'}</h5>
                                                                    </Button>
                                                                    <div>
                                                                        <Badge className="badge"
                                                                               id="warning-badge"
                                                                               style={{
                                                                                   display:
                                                                                       contract.acceptedStudentsAmount === contract.vacancies
                                                                                       && this.state.studentsRegistrations[registration.student.id].acceptedAmount < 1 ? null : 'none'
                                                                               }}>BRAK PRZYPISANIA
                                                                        </Badge>
                                                                        <Badge className="badge"
                                                                               id="conflict-badge"
                                                                               style={{
                                                                                   display:
                                                                                       registration.isAccepted
                                                                                       && this.state.studentsRegistrations[registration.student.id].acceptedAmount > 1 ? null : 'none'
                                                                               }}>KONFLIKT
                                                                        </Badge>
                                                                        <Badge className="badge"
                                                                               id="assignment-badge"
                                                                               style={{
                                                                                   display:
                                                                                       !registration.isAccepted
                                                                                       && this.state.studentsRegistrations[registration.student.id].acceptedAmount > 0 ? null : 'none'
                                                                               }}>JUŻ PRZYPISANY
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                    )
                                                }
                                            </CardColumns>
                                            <Card.Footer>
                                                <ProgressBar id="progress"
                                                             key={contract.id}
                                                             variant="success"
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

export default QualificationContracts;