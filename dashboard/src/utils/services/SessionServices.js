import AxiosUtility, { setAuthToken } from "./AxiosServices";


const getAmbulanceSession = async (ambulanceId, startDate, endDate) => {
    setAuthToken(AxiosUtility)
    const res = await AxiosUtility.get(`/sessions/ambulance_session?ambulanceId=${ambulanceId}&startDate=${startDate}&endDate=${endDate}`);

    return res.data;
}

const getHospitalSession = async (hospitalId, startDate, endDate) => {
    setAuthToken(AxiosUtility)
    const res = await AxiosUtility.get(`/sessions/hospital_session?hospitalId=${hospitalId}&startDate=${startDate}&endDate=${endDate}`);

    return res.data;
}

const SessionServices = {
    getAmbulanceSession,
    getHospitalSession
}

export default SessionServices;