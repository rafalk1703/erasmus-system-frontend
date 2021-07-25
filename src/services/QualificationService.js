import axios from "axios";

const QUALIFICATION_REST_API_URL = 'http://localhost:8080/api/qualificationView';

class QualificationService {

    getContracts() {
        return axios.get(QUALIFICATION_REST_API_URL);
    }
}

export default new QualificationService