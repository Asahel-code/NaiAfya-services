import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchAllHospitals = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/hospital/");

    return res.data;
}

const fetchSpecificHospital = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/hospital/${id}`);

    return res.data;
}

const addHospital = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/hospital/", data);

    return res.data;
}

const updateHospital = async (data, id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/hospital/${id}`, data);

    return res.data;
}

const deleteHospital = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.delete(`/hospital/${id}`);

    return res.data;
}


const HospitalServices = { 
    fetchAllHospitals,
    fetchSpecificHospital,
    addHospital,
    updateHospital,
    deleteHospital
 };


export default HospitalServices;