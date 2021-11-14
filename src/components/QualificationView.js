import React from "react";
import {Card, CardColumns, Row, Col, Button, Container, ProgressBar, FormCheck, Badge, Nav, Alert} from "react-bootstrap";
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
            selectedDegree: "Ist",
            isQualificationConfirmed: null,
            ifAllContractsQualified: false,
            restoreQualificationFlag: false,
            conflictsAmount: 0
        }
        this.prequalify = this.prequalify.bind(this);
        this.confirmQualification = this.confirmQualification.bind(this);
        this.saveQualificationChanges = this.saveQualificationChanges.bind(this);
        this.restoreCoordinatorsQualification = this.restoreCoordinatorsQualification.bind(this);
        this.resolveConflicts = this.resolveConflicts.bind(this);
    }

    clearQualification() {
        this.state.contracts.map(
            contract => {
                contract.tickedStudentsAmount = 0;
                contract.registrations.map(
                    registration => {
                        registration.registrationStatus = false;
                        this.state.studentsRegistrations[registration.student.id].tickedAmount = 0;
                    }
                )
            }
        )
    }

    prequalify() {
        this.clearQualification();
        this.setState({
            conflictsAmount: 0
        })
        for (let priority=1; priority<=3; priority++) {
            this.state.contracts.map(
                contract => {
                    if (contract.tickedStudentsAmount < contract.vacancies) {
                        contract.registrations.filter(registration => (registration.priority === priority)).map(
                            registration => {
                                if (contract.tickedStudentsAmount < contract.vacancies &&
                                    registration.registrationStatus === false &&
                                    this.state.studentsRegistrations[registration.student.id].tickedAmount < 1
                                ) {
                                    contract.tickedStudentsAmount++;
                                    registration.registrationStatus = true;
                                    this.state.studentsRegistrations[registration.student.id].tickedAmount++;
                                    this.setState({
                                        contracts : this.state.contracts,
                                        studentsRegistrations: this.state.studentsRegistrations
                                    })
                                }
                            }
                        )
                    }
                }
            )
        }
    }

    confirmQualification() {
        this.saveQualificationChanges("confirm");
        NotificationManager.success('Kwalifikacja zatwierdzona', 'Sukces!');
        CoordinatorsService.acceptContracts();
        this.setState({
            isQualificationConfirmed: true
        })
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

    restoreCoordinatorsQualification() {
        this.setState({
            restoreQualificationFlag: true
        });
        this.componentDidMount();
    }

    resolveConflicts() {
        const studentsRegistrations = Object.entries(this.state.studentsRegistrations);
        for (let i=0; i<studentsRegistrations.length; i++) {
            if (studentsRegistrations[i][1].tickedAmount > 1) {
                const tickedRegistrations = [];
                for (let j=0; j<this.state.contracts.length; j++) {
                    for (let k=0; k<this.state.contracts[j].registrations.length; k++) {
                        if (this.state.contracts[j].registrations[k].registrationStatus &&
                            this.state.contracts[j].registrations[k].student.id === Number(studentsRegistrations[i][0])) {

                            tickedRegistrations.push([j,k]);
                        }
                    }
                }
                tickedRegistrations.sort((a, b) => this.state.contracts[a[0]].registrations[a[1]].priority > this.state.contracts[b[0]].registrations[b[1]].priority ? 1 : -1);
                for (let j=tickedRegistrations.length-1; j>0; j--) {
                    let contractIndx = tickedRegistrations[j][0];
                    let registrationIndx = tickedRegistrations[j][1];
                    this.state.contracts[contractIndx].registrations[registrationIndx].registrationStatus = false;
                    this.state.contracts[contractIndx].tickedStudentsAmount--;
                    this.state.studentsRegistrations[this.state.contracts[contractIndx].registrations[registrationIndx].student.id].tickedAmount--;
                }
            }
        }
        this.setState({
            contracts: this.state.contracts,
            studentsRegistrations: this.state.studentsRegistrations,
            conflictsAmount: 0
        })
    }

    componentDidMount() {
        try {
            (async () => {
                await EditionService.getActiveEdition().then((response) => {

                    QualificationService.getQualificationByEdition(response.data.id, this.state.restoreQualificationFlag).then((response1) => {
                        this.setState({
                            contracts: response1.data.contracts,
                            studentsRegistrations: response1.data.studentsRegistrations,
                            conflictsAmount: response1.data.conflictsAmount
                        })
                    });
                });
                await EditionService.getActiveEdition().then((response) => {

                    CoordinatorsService.ifAllContractsQualified(response.data.id).then((response1) => {
                        this.setState({
                            ifAllContractsQualified: response1.data
                        })
                    });
                });
            })()
        } catch (err) {}

        CoordinatorsService.ifAccepted().then((response) => {
            this.setState({
                isQualificationConfirmed: response.data
            })
        });
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

        const checkIfAllContractsQualified = () => {
            let flag = true;
            for (let i=0; i<this.state.contracts.length; i++) {
                if (this.state.contracts[i].tickedStudentsAmount < this.state.contracts[i].vacancies) {
                    for (let j=0; j<this.state.contracts[i].registrations.length; j++) {
                        if (!this.state.contracts[i].registrations[j].registrationStatus &&
                            this.state.studentsRegistrations[this.state.contracts[i].registrations[j].student.id].tickedAmount < 1) {

                            flag = false;
                            break;
                        }
                    }
                    if (!flag) {
                        break;
                    }
                }
            }
            if (flag) {
                this.setState({
                    ifAllContractsQualified: true
                })
            } else {
                this.setState({
                   ifAllContractsQualified: false
                })
            }
        }

        return (
            <div>
                <NotificationContainer/>
                <h1 id='header'>Kwalifikacja Studentów</h1>
                <Alert variant="success" id="confirm-alert" style={{display: this.state.isQualificationConfirmed !== true ? 'none' : null}}>
                    Kwalifikacja ostatecznie zatwierdzona
                </Alert>
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
                <Button variant="outline-success" className="action-button" type="submit"
                        style={{display: this.state.conflictsAmount > 0 || !this.state.ifAllContractsQualified || this.state.isQualificationConfirmed ? 'none' : null}}
                        onClick={this.confirmQualification}>
                    Zatwierdź kwalifikację ostatecznie
                </Button>
                {
                    Cookies.get('coordinatorRole') === 'DEPARTMENT' ?
                        <Button variant="outline-secondary" className="action-button"
                                style={{display: this.state.isQualificationConfirmed ? 'none' : null}}
                                onClick={this.restoreCoordinatorsQualification}>
                            Przywróć kwalifikację koordynatorów
                        </Button>
                        : ""
                }
                <Button variant="outline-warning" className="action-button"
                        style={{display: this.state.isQualificationConfirmed !== false ? 'none' : null}}
                        onClick={() => {
                            this.prequalify();
                            this.saveQualificationChanges("draft");
                            checkIfAllContractsQualified();
                        }}>
                    Prekwalifikuj
                </Button>
                {
                    Cookies.get('coordinatorRole') === 'DEPARTMENT' ?
                        <Button variant="outline-danger" className="action-button"
                                style={{display: this.state.conflictsAmount === 0 ? 'none' : null}}
                                onClick={ () => {
                                    this.resolveConflicts();
                                    this.saveQualificationChanges("draft");
                                    checkIfAllContractsQualified();
                                }}>
                            Rozwiąż konflikty
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
                                                                                    (!registration.registrationStatus &&
                                                                                    (contract.tickedStudentsAmount >= contract.vacancies || this.state.studentsRegistrations[registration.student.id].tickedAmount > 0))
                                                                                        || this.state.isQualificationConfirmed
                                                                                        ? 'none': null
                                                                            }}
                                                                            onClick={() => {
                                                                                if (contract.tickedStudentsAmount < contract.vacancies || registration.registrationStatus ) {
                                                                                    if (registration.registrationStatus) {
                                                                                        contract.tickedStudentsAmount--;
                                                                                        if (this.state.studentsRegistrations[registration.student.id].tickedAmount > 1) {
                                                                                            this.setState({
                                                                                                conflictsAmount: this.state.conflictsAmount - 1
                                                                                            })
                                                                                        }
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
                                                                                this.saveQualificationChanges("draft");
                                                                                checkIfAllContractsQualified();
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