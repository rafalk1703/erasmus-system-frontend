import axios from 'axios'

const ALL_EDITIONS_REST_API_URL = 'http://localhost:8080/api/edition/all';

const DELETE_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/delete/';

const ADD_NEW_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/add/';

class EditionService {

    getAllEditions() {
        return axios.get(ALL_EDITIONS_REST_API_URL);
    }

    getAllEditionsByYear(year) {
        return axios.get(ALL_EDITIONS_REST_API_URL);
    }

    deleteEdition(year) {
        return axios.get(DELETE_EDITION_REST_API_URL + "/" + year);
    }

    addNewEdition(year, data) {
        return axios.post(ADD_NEW_EDITION_REST_API_URL + "/" + year, data);
    }
}


export default new EditionService