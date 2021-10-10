import axios from 'axios'
import Cookies from "js-cookie";

const ALL_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/allContractCoordinatorsView';

class CoordinatorsService {

    getAllCoordinators() {
        return axios.get(ALL_COORDINATORS_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    getAllCoordinatorsByEdition(id) {
        return axios.get(ALL_COORDINATORS_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }
}

export default new CoordinatorsService