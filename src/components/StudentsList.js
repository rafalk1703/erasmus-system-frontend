import React, {Component} from "react";
import {Accordion, Card} from "react-bootstrap";
import {InputLabel} from "@material-ui/core";
import Select from "react-select";
import EditionService from "../services/EditionService";
import StudentsService from "../services/StudentsService";
import "./StudentsList.css"

class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            all: [],
            students: [],
            names: ""
        };
    }

    componentDidMount() {
        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    StudentsService.getStudentsAllDataByEdition(response1.data.id).then((response) => {
                        this.setState({
                            all: response.data,
                            students: response.data
                        });
                    });
                });
            })()
        } catch (err) {}
    }

    filterByNames = (entry) => {
        let names = entry.value;
        if (names === "") {
            this.setState({
                names: "",
                students: this.state.all
            });
        } else {
            const splitNames = names.split(" ");
            this.setState({
                names: names,
                students: this.state.all.filter(
                    student => {
                        return student.name.indexOf(splitNames[0]) >=0 &&
                            student.surname.indexOf(splitNames[1]) >=0
                    }
                )
            });
        }
    }

    render() {

        const namesOptions = this.state.all.map((student) => ({
            value: student.name + " " + student.surname,
            label: student.name + " " + student.surname
        }));

        namesOptions.push({
            value: "",
            label: "All"
        });

        return (
            <div>
                <h1 className="text-center">Dane studentów</h1>
                <br></br>
                <div id="select">
                    <InputLabel id="label">Imię i nazwisko:</InputLabel>
                    <Select options={namesOptions} onChange={this.filterByNames} placeholder="All"/>
                </div>
                <br></br>
                <Accordion>
                    {
                        this.state.students.map(
                            student =>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey={student.id}>
                                        {student.name} {student.surname}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={student.id}>
                                        <Card.Body>
                                            <ul>
                                                <li>Wydział: {student.department}</li>
                                                <li>Kierunek: {student.field}</li>
                                                <li>Rok studiów: {student.year}</li>

                                                <li>Adres e-mail: {student.email}</li>
                                                <li>Numer telefonu: {student.phoneNumber}</li>
                                                <li>Adres: {student.address}</li>

                                                <li>Wcześniejszy udział: {student.earlierParticipation}</li>
                                                <li>Miesiące pobytu: {student.periodOfStay}</li>
                                                <li>Średnia ocen: {student.averageGrade}</li>

                                                <li>Język obcy: {student.foreignLanguage}</li>
                                                <li>Rodzaj certyfikatu: {student.typeOfCertificate}</li>
                                                <li>Poziom egzaminu: {student.examLevel}</li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                        )
                    }
                </Accordion>
            </div>
        );
    }
}

export default StudentsList;