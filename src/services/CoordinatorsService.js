import axios from 'axios'

const ALL_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/allContractCoordinatorsView';

class CoordinatorsService {

    getAllCoordinators() {
        return axios.get(ALL_COORDINATORS_REST_API_URL);
    }

    getAllCoordinatorsEdition(year) {
        return axios.get(ALL_COORDINATORS_REST_API_URL + "/" + year);
    }
}


export default new CoordinatorsService