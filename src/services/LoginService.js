import axios from "axios";

const LOGIN_REST_API_URL = 'http://localhost:8080/api/coordinator/login';

class LoginService {

    login(loginData) {
        return axios.post(LOGIN_REST_API_URL, loginData);
    }
}

export default new LoginService()