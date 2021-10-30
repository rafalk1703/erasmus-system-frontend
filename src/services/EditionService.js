import axios from 'axios'
import Cookies from "js-cookie";

const ALL_EDITIONS_REST_API_URL = 'http://localhost:8080/api/edition/all';

const DELETE_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/delete/';

const ADD_NEW_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/add/';

const DEACTIVE_EDITION_REST_API_URL = 'http://localhost:8080/api/edition/deactivate/';

const STATISTICS_REST_API_URL = 'http://localhost:8080/api/edition/statistics/';

const ACTIVE_EDITION = 'http://localhost:8080/api/edition/active';

const GENERATE_FILE_BY_EDITION = 'http://localhost:8080/api/file/generate/';

const EDIT_EDITION= 'http://localhost:8080/api/edition/update';

const IF_CAN_DOWNLOAD_FILES = 'http://localhost:8080/api/edition/ifCanDownload';

const IF_CAN_DOWNLOAD_EDITIONS_LIST = 'http://localhost:8080/api/edition/editions/ifCanDownload';

class EditionService {

    getAllEditions() {
        return axios.get(ALL_EDITIONS_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    getAllEditionsByYear() {
        return axios.get(ALL_EDITIONS_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    deleteEdition(id) {
        return axios.get(DELETE_EDITION_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    addNewEdition(data) {
        return axios.post(ADD_NEW_EDITION_REST_API_URL, data);
    }

    deactiveEdition(id) {
        return axios.get(DEACTIVE_EDITION_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    getStatistics(id) {
        return axios.get(STATISTICS_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    getActiveEdition() {
        return axios.get(ACTIVE_EDITION, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    generateFileByEdition(id) {
        return axios.get(GENERATE_FILE_BY_EDITION + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    editEdition(data) {
        return axios.post(EDIT_EDITION, data);
    }

    ifCanDownload(id, if_wieit) {
        return axios.get(IF_CAN_DOWNLOAD_FILES + "/" + id + "/" + if_wieit, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    ifCanDownloadEditionsList() {
        return axios.get(IF_CAN_DOWNLOAD_EDITIONS_LIST, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }
}

export default new EditionService()