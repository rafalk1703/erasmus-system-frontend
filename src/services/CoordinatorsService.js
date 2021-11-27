import axios from 'axios'
import Cookies from "js-cookie";

const ALL_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/coordinators';

const NOTIFY_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/coordinator/notify';

const NOTIFY_ALL_COORDINATORS_REST_API_URL = 'http://localhost:8080/api/coordinators/notify';

const ACCEPT_CONTRACTS_REST_API_URL = 'http://localhost:8080/api/coordinator/accept';

const IF_HAS_CONTRACTS_REST_API_URL = 'http://localhost:8080/api/coordinator/if-has-contracts';

const IF_ACCEPTED_REST_API_URL = 'http://localhost:8080/api/coordinator/if-accepted';

const IF_ALL_CONTRACTS_QUALIFIED_REST_API_URL = 'http://localhost:8080/api/coordinator/if-all-contracts-qualified';

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