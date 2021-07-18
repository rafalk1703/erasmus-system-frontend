import axios from 'axios';
import React, { Component } from 'react';
import { FaThinkPeaks } from 'react-icons/fa';

class UploadFile extends Component {


    constructor(props) {
        super(props);
    
        this.state = { 
  
            // Initially, no file is selected 
            coordinatorsFile: null,
            contractsFile: null,
            registrationsFile: null,
            year: " "
          }; 
    
        this.takeYear = this.takeYear.bind(this);
    }
    
       

      takeYear(e) { 
        this.setState({ year: e.target.value })};

      // On file select (from the pop up) 
      onFile1Change = event => { 
        // Update the state 
        
        this.setState({ coordinatorsFile: event.target.files[0] }); 
        // this.setState({ contractsFile: event.target.files[1] });
        // this.setState({ registrationsFile: event.target.files[2] });

      }; 

      onFile2Change = event => { 
        // Update the state 
        
        this.setState({ contractsFile: event.target.files[0] }); 
        // this.setState({ contractsFile: event.target.files[1] });
        // this.setState({ registrationsFile: event.target.files[2] });

      }; 

      onFile3Change = event => { 
        // Update the state 
        
        this.setState({ registrationsFile: event.target.files[0] }); 
        // this.setState({ contractsFile: event.target.files[1] });
        // this.setState({ registrationsFile: event.target.files[2] });

      }; 
       
      // On file upload (click the upload button) 
      onFileUpload = () => { 
        // Create an object of formData 
        const formData = new FormData(); 
       
        // Update the formData object 
        formData.append("coordinators_file", this.state.coordinatorsFile); 
        formData.append("contracts_file", this.state.contractsFile);
        formData.append("registrations_file", this.state.registrationsFile);
       
        // Details of the uploaded file 
        console.log(this.state.coordinatorsFile); 
        console.log(this.state.contractsFile); 
        console.log(this.state.registrationsFile); 
       
        // Request made to the backend api 
        // Send formData object 
        axios.post("http://localhost:8080/api/edition/add/" + this.state.year, formData); 
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
                  <label>koordynatorzt</label>
                  <input type="file" onChange={this.onFile1Change} /> 
                  <label>kontrakty</label>
                  <input type="file" onChange={this.onFile2Change} /> 
                  <label>wnioski</label>
                  <input type="file" onChange={this.onFile3Change} /> 
                  <label>Rok edycji</label>
                  <input type="text" id="year" name="year" onChange={this.takeYear} placeholder="Rok edycji" /> 
                  <button onClick={this.onFileUpload}> 
                    Upload! 
                  </button> 
              </div> 
            {this.file1Data()} 
            {this.file2Data()} 
            {this.file3Data()} 
          </div> 
        ); 
      } 
    } 
    
  
  

//     render() {
//         return (
//             <div className='editions'>
//                 <h1 className='text-center'>Lista Kontraktów</h1>
              
//         <form>
//         <label for="coordinators">Plik z koordynatorami umów:</label>
//         <input id="coordinators" name="coordinators" type="file" />
//         <label for="contracts">Plik z umowami:</label>
//         <input id="contracts" name="contracts" type="file" />
//         <label for="data">Plik z danymi z ankiet:</label>
//         <input id="data" name="data" type="file" />
//         <button type="submit" class="primary submit-btn">Submit</button>
//       </form>
//       </div>
          
//         );
//     }
// }

export default UploadFile;