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
            selectedDegree: "Ist",
            prequalifyDone: false
        }
        this.prequalify = this.prequalify.bind(this);
        this.confirmQualification = this.confirmQualification.bind(this);
        this.saveQualificationChanges = this.saveQualificationChanges.bind(this);
    }

    prequalify() {
        this.state.contracts.map(
            contract => {
                const registrationsPriority1 = contract.registrations.filter(registration => registration.priority === 1);
                if (registrationsPriority1.length <= contract.vacancies) {
                    registrationsPriority1.map(r => r.isNominated = true);
                } else {
                    for (var i=0; i<contract.vacancies; i++) {
                        registrationsPriority1[i].isNominated = true;
                    }
                }
            }
        )
        this.setState({contracts: this.state.contracts});
        this.setState({prequalifyDone: true});
        this.saveQualificationChanges();
        this.componentDidMount();
    }

    confirmQualification() {
        this.saveQualificationChanges();
        NotificationManager.success('Kwalifikacja zatwierdzona', 'Sukces!');
        CoordinatorsService.acceptContracts();
    }

    saveQualificationChanges() {
        const registrationsBody = [];

        this.state.contracts.map( contract => {
            contract.registrations.map( registration => {
                let reg = {
                    "registrationId": registration.id,
                    "registrationStatus": registration.isNominated
                };
                registrationsBody.push(reg);
            });
        });

        let body = {
            "sessionCode": Cookies.get('sessionCode'),
            "registrations": registrationsBody
        };

        QualificationService.saveQualification(body);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.saveQualificationChanges();
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
                <Nav variant="tabs" className="flex-row" id="degree-switch" defaultActiveKey="Ist">
                    <Nav.Item>
                        <Nav.Link eventKey="Ist" onSelect={() => this.setState({selectedDegree: "Ist"})}>
                            I stopień
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="IIst" onSelect={() => this.setState({selectedDegree: "IIst"})}>
                            II stopień
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="IIIst" onSelect={() => this.setState({selectedDegree: "IIIst"})}>
                            III stopień
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Button variant="outline-success" className="action-button" type="submit" onClick={this.confirmQualification}>
                    Zatwierdź kwalifikację
                </Button>
                <Button variant="outline-warning" className="action-button" disabled={this.state.prequalifyDone} onClick={this.prequalify}>
                    Prekwalifikuj
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
                                                                              registration.isNominated ? '#d0f0c0' : '#FFFFFF'
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
                                                                    <Button variant={registration.isNominated ? "danger" : "success"}
                                                                            id="plus-minus"
                                                                            disabled={contract.tickedStudentsAmount >= contract.vacancies && !registration.isNominated}
                                                                            onClick={() => {
                                                                                if (contract.tickedStudentsAmount < contract.vacancies || registration.isNominated ) {
                                                                                    if (registration.isNominated) {
                                                                                        contract.tickedStudentsAmount--;
                                                                                        this.state.studentsRegistrations[registration.student.id].tickedAmount--;
                                                                                    } else {
                                                                                        contract.tickedStudentsAmount++;
                                                                                        this.state.studentsRegistrations[registration.student.id].tickedAmount++;
                                                                                    }
                                                                                    registration.isNominated = !registration.isNominated
                                                                                    this.setState({
                                                                                        contracts: this.state.contracts,
                                                                                        studentsRegistrations: this.state.studentsRegistrations
                                                                                    })
                                                                                }
                                                                            }}>
                                                                        <h5>{registration.isNominated ? '-' : '+'}</h5>
                                                                    </Button>
                                                                    <div>
                                                                        <Badge className="badge"
                                                                               id="warning-badge"
                                                                               style={{
                                                                                   display:
                                                                                       contract.tickedStudentsAmount === contract.vacancies
                                                                                       && this.state.studentsRegistrations[registration.student.id].tickedAmount < 1 ? null : 'none'
                                                                               }}>BRAK PRZYPISANIA
                                                                        </Badge>
                                                                        <Badge className="badge"
                                                                               id="conflict-badge"
                                                                               style={{
                                                                                   display:
                                                                                       registration.isNominated
                                                                                       && this.state.studentsRegistrations[registration.student.id].tickedAmount > 1 ? null : 'none'
                                                                               }}>KONFLIKT
                                                                        </Badge>
                                                                        <Badge className="badge"
                                                                               id="assignment-badge"
                                                                               style={{
                                                                                   display:
                                                                                       !registration.isNominated
                                                                                       && this.state.studentsRegistrations[registration.student.id].tickedAmount > 0 ? null : 'none'
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
                                                             now={contract.tickedStudentsAmount / contract.vacancies * 100}
                                                             label={`${contract.tickedStudentsAmount} z ${contract.vacancies}`}
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