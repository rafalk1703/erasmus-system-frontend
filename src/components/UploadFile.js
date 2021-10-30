import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import EditionService from '../services/EditionService'
import "./UploadFile.css";

class UploadFile extends Component {


  constructor(props) {
    super(props);

    this.state = {
      coordinatorsFile: null,
      contractsFile: null,
      registrationsFile: null,
      year: " "
    };

    this.takeYear = this.takeYear.bind(this);
  }



  takeYear(e) {
    this.setState({ year: e.target.value })
  };

  onFile1Change = event => {

    this.setState({ coordinatorsFile: event.target.files[0] });
  };

  onFile2Change = event => {

    this.setState({ contractsFile: event.target.files[0] });
  };

  onFile3Change = event => {


    this.setState({ registrationsFile: event.target.files[0] });

  };

  onFileUpload = () => {

    const formData = new FormData();

    formData.append("edition_year", this.state.year);
    formData.append("coordinators_file", this.state.coordinatorsFile);
    formData.append("contracts_file", this.state.contractsFile);
    formData.append("registrations_file", this.state.registrationsFile);
    formData.append("session_code", Cookies.get('sessionCode'));

    EditionService.addNewEdition(formData);

    window.location.href = "/";
  };

  file1Data = () => {
    if (this.state.coordinatorsFile) {

      return (
        <div class="file-details">
          <p>Szczegóły pliku:</p>
          <p>Nazwa pliku: {this.state.coordinatorsFile.name}</p>
          <p>Typ pliku: {this.state.coordinatorsFile.type}</p>
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

  file2Data = () => {
    if (this.state.contractsFile) {

      return (
        <div class="file-details">
          <p>Szczegóły pliku:</p>
          <p>Nazwa pliku: {this.state.contractsFile.name}</p>
          <p>Typ pliku: {this.state.contractsFile.type}</p>
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

  file3Data = () => {
    if (this.state.registrationsFile) {

      return (
        <div class="file-details">
          <p><b>Szczegóły pliku:</b></p>
          <p>Nazwa pliku: {this.state.registrationsFile.name}</p>
          <p>Typ pliku: {this.state.registrationsFile.type}</p>
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
        <h1 className='text-center'>Tworzenie nowej edycji</h1>
        <h3>Dodaj pliki nowej edycji</h3>
        <div>
          <div>
            <label>Koordynatorzy:</label>
            <br></br>
            <input type="file" accept=".csv" onChange={this.onFile1Change} />
            {this.file1Data()}
          </div>
          <div>
            <label>Umowy:</label>
            <br></br>
            <input type="file" accept=".csv" onChange={this.onFile2Change} />
            {this.file2Data()}
          </div>
          <div>
            <label>Zgłoszenia:</label>
            <br></br>
            <input type="file" accept=".csv" onChange={this.onFile3Change} />
            {this.file3Data()}
          </div>
          <div>
            <label>Rok edycji:</label>
            <br></br>
            <input type="text" id="year" name="year" onChange={this.takeYear} placeholder="Rok edycji" />
          </div>
          <br></br>
          <div>
          <Button variant="outline-primary" onClick={this.onFileUpload}>
            Stwórz edycję
                  </Button>
                  </div>
        </div>

      </div>
    );
  }
}

export default UploadFile;