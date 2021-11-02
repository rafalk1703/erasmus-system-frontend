import React from "react";
import {Card, CardColumns, Row, Col, Button, Container, ProgressBar, FormCheck, Badge, Nav} from "react-bootstrap";
import Cookies from "js-cookie";
import QualificationService from '../services/QualificationService';
import EditionService from "../services/EditionService";
import "./QualificationView.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CoordinatorsService from "../services/CoordinatorsService";
import 'react-notifications/lib/notifications.css';

class QualificationView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: [],
            studentsRegistrations: {},
            markedRegistrationsFlags: {},
            isSthMarked: false,
            selectedDegree: "1st",
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
                    registrationsPriority1.map(r => r.registrationStatus = true);
                } else {
                    for (var i=0; i<contract.vacancies; i++) {
                        registrationsPriority1[i].registrationStatus = true;
                    }
                }
            }
        )
        this.setState({contracts: this.state.contracts});
        this.setState({prequalifyDone: true});
        this.saveQualificationChanges("draft");
        this.componentDidMount();
    }

    confirmQualification() {
        this.saveQualificationChanges("confirm");
        NotificationManager.success('Kwalifikacja zatwierdzona', 'Sukces!');
        CoordinatorsService.acceptContracts();
    }

    saveQualificationChanges(typeOfSaving) {
        const registrationsBody = [];

        this.state.contracts.map( contract => {
            contract.registrations.map( registration => {
                let reg = {
                    "registrationId": registration.id,
                    "registrationStatus": registration.registrationStatus
                };
                registrationsBody.push(reg);
            });
        });

        let body = {
            "sessionCode": Cookies.get('sessionCode'),
            "registrations": registrationsBody,
            "typeOfSaving": typeOfSaving
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
        this.saveQualificationChanges("draft");
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
                <Button variant="outline-success" className="action-button" type="submit" onClick={this.confirmQualification}>
                    Zatwierdź kwalifikację ostatecznie
                </Button>
                {
                    Cookies.get('coordinatorRole') === 'CONTRACTS' ?
                        <Button variant="outline-warning" className="action-button" disabled={this.state.prequalifyDone} onClick={this.prequalify}>
                            Prekwalifikuj
                        </Button>
                        : ""
                }
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
                                                                      borderWidth:
                                                                          this.state.markedRegistrationsFlags[registration.id] ? '5px' : null,
                                                                      borderColor:
                                                                          this.state.markedRegistrationsFlags[registration.id] ? 'CornflowerBlue': null,
                                                                      backgroundColor:
                                                                              registration.registrationStatus ? '#d0f0c0' : '#FFFFFF',
                                                                      opacity:
                                                                          !registration.registrationStatus &&
                                                                          this.state.studentsRegistrations[registration.student.id].tickedAmount > 0 &&
                                                                          !this.state.markedRegistrationsFlags[registration.id]
                                                                              ? 0.5 : 1
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
                                                                    <Button variant={registration.registrationStatus ? "danger" : "success"}
                                                                            id="plus-minus"
                                                                            style={{
                                                                                display:
                                                                                    !registration.registrationStatus &&
                                                                                    (contract.tickedStudentsAmount >= contract.vacancies || this.state.studentsRegistrations[registration.student.id].tickedAmount > 0)
                                                                                        ? 'none': null
                                                                            }}
                                                                            onClick={() => {
                                                                                if (contract.tickedStudentsAmount < contract.vacancies || registration.registrationStatus ) {
                                                                                    if (registration.registrationStatus) {
                                                                                        contract.tickedStudentsAmount--;
                                                                                        this.state.studentsRegistrations[registration.student.id].tickedAmount--;
                                                                                    } else {
                                                                                        contract.tickedStudentsAmount++;
                                                                                        this.state.studentsRegistrations[registration.student.id].tickedAmount++;
                                                                                    }
                                                                                    registration.registrationStatus = !registration.registrationStatus
                                                                                    this.setState({
                                                                                        contracts: this.state.contracts,
                                                                                        studentsRegistrations: this.state.studentsRegistrations
                                                                                    })
                                                                                }
                                                                            }}>
                                                                        <h5>{registration.registrationStatus ? '-' : '+'}</h5>
                                                                    </Button>
                                                                    <div>
                                                                        <Badge id="warning-badge"
                                                                               style={{
                                                                                   display:
                                                                                       contract.tickedStudentsAmount === contract.vacancies
                                                                                       && this.state.studentsRegistrations[registration.student.id].tickedAmount < 1 ? null : 'none'
                                                                               }}>BRAK PRZYPISANIA NA ŻADNĄ UMOWĘ
                                                                        </Badge>
                                                                        {
                                                                            Cookies.get('coordinatorRole') === 'DEPARTMENT' ?
                                                                                <Badge id="conflict-badge"
                                                                                       style={{
                                                                                           display:
                                                                                               registration.registrationStatus
                                                                                               && this.state.studentsRegistrations[registration.student.id].tickedAmount > 1 ? null : 'none'
                                                                                       }}>KONFLIKT
                                                                                </Badge>
                                                                                : ""
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                    )
                                                }
                                            </CardColumns>
                                            <Card.Footer>
                                                <ProgressBar id="progress"
                                                             key={contract.id}
                                                             variant={
                                                                 contract.tickedStudentsAmount === contract.vacancies ? "success" : "warning"
                                                             }
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

export default QualificationView;