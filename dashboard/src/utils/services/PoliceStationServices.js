import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchAllPoliceStations = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/police_station/");

    return res.data;
}

const fetchSpecificPoliceStation = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/police_station/${id}`);

    return res.data;
}

const addPoliceStation = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/police_station/", data);

    return res.data;
}

const updatePoliceStation = async (data, id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/police_station/${id}`, data);

    return res.data;
}

const deletePoliceStation = async (id) => {
    const res = await AxiosUtility.delete(`/police_station/${id}`);

    return res.data;
}


const PoliceStationServices = { 
    fetchAllPoliceStations,
    fetchSpecificPoliceStation,
    addPoliceStation,
    updatePoliceStation,
    deletePoliceStation
 };


export default PoliceStationServices;