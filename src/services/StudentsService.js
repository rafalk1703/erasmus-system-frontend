import axios from 'axios'
import Cookies from "js-cookie";

const ALL_STUDENTS_DATA_REST_API_URL = "http://localhost:8080/api/studentsView";

class StudentsService {

    getStudentsAllDataByEdition(id) {
        return axios.get(ALL_STUDENTS_DATA_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }
}

export default new StudentsService