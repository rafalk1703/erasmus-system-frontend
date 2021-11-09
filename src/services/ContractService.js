import axios from 'axios'
import Cookies from "js-cookie";

const ALL_CONTRACTS_REST_API_URL = 'http://localhost:8080/api/allContractsView';

const NEW_NUMBER_OF_VACANCIES_REST_API_URL = 'http://localhost:8080/api/changeNumberOfVacancies';

class ContractService {

    getAllContracts() {
        return axios.get(ALL_CONTRACTS_REST_API_URL, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    getAllContractsByEdition(id) {
        return axios.get(ALL_CONTRACTS_REST_API_URL + "/" + id, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }

    changeNumberOfVacancies(id, vacancies) {
        return axios.get(NEW_NUMBER_OF_VACANCIES_REST_API_URL + "/" + id + "/" + vacancies, { headers: {'Session-Code': Cookies.get('sessionCode')} });
    }
}

export default new ContractService()