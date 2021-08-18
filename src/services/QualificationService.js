import axios from "axios";

const QUALIFICATION_VIEW_REST_API_URL = 'http://localhost:8080/api/qualification/view';

const SAVE_QUALIFICATION_REST_API_URL = 'http://localhost:8080/api/qualification/save';

class QualificationService {

    getQualification() {
        return axios.get(QUALIFICATION_VIEW_REST_API_URL);
    }

    saveQualification(body) {
        return axios.post(SAVE_QUALIFICATION_REST_API_URL, body);
    }
}

export default new QualificationService