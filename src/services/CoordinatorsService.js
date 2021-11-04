import axios from 'axios'
import Cookies from "js-cookie";

const ALL_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/allContractCoordinatorsView';

const NOTIFY_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/notify';

const NOTIFY_ALL_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/notifyAll';

const ACCEPT_CONTRACTS_REST_API_URL = 'http://localhost:8080/api/acceptContracts';

const IF_HAS_CONTRACTS_REST_API_URL = 'http://localhost:8080/api/ifHasContracts';

const IF_ACCEPTED_REST_API_URL = 'http://localhost:8080/api/ifAccepted';

const IF_ALL_CONTRACTS_QUALIFIED_REST_API_URL = 'http://localhost:8080/api/ifAllContractsQualified';

class CoordinatorsService {

    getAllCoordinators() {
        return axios.get(ALL_COORDINATORS_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    getAllCoordinatorsByEdition(id) {
        return axios.get(ALL_COORDINATORS_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    nofityCoordinator(id) {
        return axios.get(NOTIFY_COORDINATORS_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    nofityAllCoordinators(edition_id) {
        return axios.get(NOTIFY_ALL_COORDINATORS_REST_API_URL + "/" + edition_id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    acceptContracts() {
        return axios.get(ACCEPT_CONTRACTS_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    ifHasContracts(edition_id) {
        return axios.get(IF_HAS_CONTRACTS_REST_API_URL + "/" + edition_id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    ifAccepted() {
        return axios.get(IF_ACCEPTED_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    ifAllContractsQualified(edition_id) {
        return axios.get(IF_ALL_CONTRACTS_QUALIFIED_REST_API_URL + "/" + edition_id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }
}

export default new CoordinatorsService()