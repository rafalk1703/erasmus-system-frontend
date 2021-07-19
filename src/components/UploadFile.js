import axios from 'axios';
import React, { Component } from 'react';
import { FaThinkPeaks } from 'react-icons/fa';
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

    formData.append("coordinators_file", this.state.coordinatorsFile);
    formData.append("contracts_file", this.state.contractsFile);
    formData.append("registrations_file", this.state.registrationsFile);

    console.log(this.state.coordinatorsFile);
    console.log(this.state.contractsFile);
    console.log(this.state.registrationsFile);


    EditionService.addNewEdition(this.state.year, formData);
    // axios.post("http://localhost:8080/api/edition/add/" + this.state.year, formData); 
  };

  file1Data = () => {
    if (this.state.coordinatorsFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.coordinatorsFile.name}</p>
          <p>File Type: {this.state.coordinatorsFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.coordinatorsFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  file2Data = () => {
    if (this.state.contractsFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.contractsFile.name}</p>
          <p>File Type: {this.state.contractsFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.contractsFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  file3Data = () => {
    if (this.state.registrationsFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.registrationsFile.name}</p>
          <p>File Type: {this.state.registrationsFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.registrationsFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1 className='text-center'>Dodaj Pliki</h1>
        <h3>
          File Upload using React!
              </h3>
        <div>
          <div>
            <label>Koordynatorzy</label>
            <input type="file" accept=".csv" onChange={this.onFile1Change} />
            {this.file1Data()}
          </div>
          <div>
            <label>Umowy</label>
            <input type="file" accept=".csv" onChange={this.onFile2Change} />
            {this.file2Data()}
          </div>
          <div>
            <label>Zgłoszenia</label>
            <input type="file" accept=".csv" onChange={this.onFile3Change} />
            {this.file3Data()}
          </div>
          <div>
            <label>Rok edycji</label>
            <input type="text" id="year" name="year" onChange={this.takeYear} placeholder="Rok edycji" />
          </div>
          <button onClick={this.onFileUpload}>
            Upload!
                  </button>
        </div>

      </div>
    );
  }
}

export default UploadFile;