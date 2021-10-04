import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaThinkPeaks } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import EditionService from '../services/EditionService'
import "./UploadFile.css";

class EditFile extends Component {


    constructor(props) {
        super(props);

        this.state = {
            editEditionFile: null,
        };

    }


    onFileChange = event => {
        this.setState({ editEditionFile: event.target.files[0] });
    };


    onFileUpload = () => {

        const formData = new FormData();

        formData.append("edition_id", this.props.id);
        formData.append("edit_edition_file", this.state.editEditionFile);


        EditionService.editEdition(formData);

        window.location.href = "/editions";
    };

    fileData = () => {
        if (this.state.editEditionFile) {

            return (
                <div class="file-details">
                    <p>Nazwa pliku: {this.state.editEditionFile.name}</p>
                    <p>Typ pliku: {this.state.editEditionFile.type}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />

                </div>
            );
        }
    };



    render() {
        return (
            <div>
                <h1 className='text-center'>Edytowanie edycji</h1>
                <h3>Dodaj nowy plik zgłoszeń</h3>
                <div>
                    <div>
                        <label>Zgłoszenia:</label>
                        <br></br>
                        <input type="file" accept=".csv" onChange={this.onFileChange} />
                        {this.fileData()}
                    </div>

                    <br></br>
                    <div>
                        <Button variant="outline-primary" onClick={this.onFileUpload}>Edytuj edycję</Button>
                    </div>
                </div>

            </div>
        );
    }
}

export default EditFile;