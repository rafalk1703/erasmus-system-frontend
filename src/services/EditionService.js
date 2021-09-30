import axios from 'axios'

const ALL_EDITIONS_REST_API_URL = 'http://localhost:8080/api/edition/all';

const DELETE_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/delete/';

const ADD_NEW_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/add/';

const DEACTIVE_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/deactivate/';

const STATISTICS_REST_API_URL = 'http://localhost:8080/api/edition/statistics/';

const ACTIVE_EDITION = 'http://localhost:8080/api/edition/active';

const GENERATE_FILE_BY_EDITION = 'http://localhost:8080/api/file/generate/';

const EDIT_EDITION= 'http://localhost:8080/api/edition/update';


class EditionService {

    getAllEditions() {
        return axios.get(ALL_EDITIONS_REST_API_URL);
    }

    getAllEditionsByYear() {
        return axios.get(ALL_EDITIONS_REST_API_URL);
    }

    deleteEdition(id) {
        return axios.get(DELETE_EDITION_REST_API_URL + "/" + id);
    }

    addNewEdition(data) {
        return axios.post(ADD_NEW_EDITION_REST_API_URL, data);
    }

    deactiveEdition(id) {
        return axios.get(DEACTIVE_EDITION_REST_API_URL + "/" + id);
    }

    getStatistics(id) {
        return axios.get(STATISTICS_REST_API_URL + "/" + id);
    }

    getActiveEdition() {
        return axios.get(ACTIVE_EDITION);
    }

    generateFileByEdition(id) {
        return axios.get(GENERATE_FILE_BY_EDITION + "/" + id);
    }

    editEdition(data) {
        return axios.post(EDIT_EDITION, data);
    }
}


export default new EditionService