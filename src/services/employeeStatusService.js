import axios from "axios";

const base_url = "http://localhost:8080/employeeStatus";

export const getAllEmployeeStatusesList = ()=>{
    return axios.get(base_url+"/findall");
}