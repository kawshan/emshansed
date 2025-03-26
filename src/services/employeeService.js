import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/employee";

// http://localhost:8080/employee/findAll

export const findAllEmployeeService = () => {
    return axios.get(REST_API_BASE_URL+"/findAll");
}

























