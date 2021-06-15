import axios from 'axios'

const ALL_CONTRACTS_REST_API_URL = 'http://localhost:8080/api/allContractsView';

class ContractService {

    getAllContracts() {
        return axios.get(ALL_CONTRACTS_REST_API_URL);
    }
}


export default new ContractService