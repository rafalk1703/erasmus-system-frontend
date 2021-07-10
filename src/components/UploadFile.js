import React, { Component } from 'react';


class UploadFile extends Component {
  

    render() {
        return (
            <div className='editions'>
                <h1 className='text-center'>Lista Kontraktów</h1>
              
        <form>
        <label for="coordinators">Plik z koordynatorami umów:</label>
        <input id="coordinators" name="coordinators" type="file" />
        <label for="contracts">Plik z umowami:</label>
        <input id="contracts" name="contracts" type="file" />
        <label for="data">Plik z danymi z ankiet:</label>
        <input id="data" name="data" type="file" />
        <button type="submit" class="primary submit-btn">Submit</button>
      </form>
      </div>
          
        );
    }
}

export default UploadFile;