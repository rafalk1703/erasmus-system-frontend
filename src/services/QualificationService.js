import axios from "axios";
import Cookies from "js-cookie";

const QUALIFICATION_VIEW_REST_API_URL = 'http://localhost:8080/api/qualification/edition-view';

const SAVE_QUALIFICATION_REST_API_URL = 'http://localhost:8080/api/qualification/save';

class QualificationService {

    getQualificationByEdition(id, restore) {
        return axios.get(QUALIFICATION_VIEW_REST_API_URL + "/" + id + "/" + restore, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    saveQualification(body) {
        return axios.post(SAVE_QUALIFICATION_REST_API_URL, body);
    }
}

export default new QualificationService()