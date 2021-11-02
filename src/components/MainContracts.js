import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import "./MainDepartment";
import CoordinatorsService from '../services/CoordinatorsService';
import EditionService from '../services/EditionService';


class MainDepartemt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ifHasContracts: '',
            ifAccepted: '',
            activeEditionYear: ''
        }

    }


    componentDidMount() {

        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    CoordinatorsService.ifHasContracts(response1.data.id).then((response) => {
                        this.setState({ ifHasContracts: response.data })
                        this.setState({ activeEditionYear: response1.data.year })

                    });


                });
            })()
        } catch (err) {

        }
        CoordinatorsService.ifAccepted().then((response) => {
            this.setState({ ifAccepted: response.data })
        });

    }

    render() {
        console.log(this.state);

        const renderIfActive = (activeEditionYear, ifHasContracts, ifAccepted) => {
            if (activeEditionYear !== '') {

                if (ifHasContracts === true) {


                    if (ifAccepted === true) {

                        return <div >
                            <div class="content">
                                <br></br>
                                <h1 className='label'><Alert variant="success">Studenci zaakceptowani</Alert></h1>
                            </div>
                        </div>;
                    } else {
                        return <div >
                            <div class="content">
                                <br></br>
                                <h1 className='label'><Alert variant="danger">Studenci niezaakceptowani</Alert></h1>
                            </div>
                        </div>;
                    }


                } else {
                    return <div >
                        <div class="content">
                            <br></br>
                            <h1 className='label'><Alert variant="danger">Nie masz kontraktów w tej edycji</Alert></h1>
                        </div>
                    </div>;
                }


            } else {
                return <div >
                    <div class="content">
                        <br></br>
                        <h1 className='label'><Alert variant="danger">Brak aktywnej edycji</Alert></h1>
                    </div>
                </div>;
            }
        }


        return (
            <div class="edition_info">{renderIfActive(this.state.activeEditionYear, this.state.ifHasContracts, this.state.ifAccepted)}</div>

        );
    }
}

export default MainDepartemt;