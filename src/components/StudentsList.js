import React, {Component} from "react";
import {Accordion, Card} from "react-bootstrap";
import EditionService from "../services/EditionService";
import StudentsService from "../services/StudentsService";

class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
    }

    componentDidMount() {
        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    StudentsService.getStudentsAllDataByEdition(response1.data.id).then((response) => {
                        this.setState({ students: response.data } );
                    });
                });
            })()
        } catch (err) {}
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Dane studentów</h1>
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
                                                <li>Miesiące pobytu: {student.periodOfStay}</li>
                                                <li>Wcześniejszy udział: {student.earlierParticipation}</li>
                                                <li>Średnia ocen: {student.averageGrade}</li>
                                                <li>Zaliczony semestr: {student.ifCompletedSemester}</li>
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