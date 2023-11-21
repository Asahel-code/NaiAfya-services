import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchAllAmbulances = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/ambulance/");

    return res.data;
}

const fetchSpecificAmbulance = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/ambulance/${id}`);

    return res.data;
}

const addAmbulance = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/ambulance/", data);

    return res.data;
}

const updateAmbulance = async (data, id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/ambulance/${id}`, data);

    return res.data;
}

const deleteAmbulance = async (id) => {
    const res = await AxiosUtility.delete(`/ambulance/${id}`);

    return res.data;
}


const AmbulanceServices = { 
    fetchAllAmbulances,
    fetchSpecificAmbulance,
    addAmbulance,
    updateAmbulance,
    deleteAmbulance
 };


export default AmbulanceServices;