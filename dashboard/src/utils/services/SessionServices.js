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

const getFireFighterSession = async (fireFighterId, startDate, endDate) => {
    setAuthToken(AxiosUtility)
    const res = await AxiosUtility.get(`/sessions/fire_fighter_session?fighterId=${fireFighterId}&startDate=${startDate}&endDate=${endDate}`);

    return res.data;
}

const getPoliceStationSession = async (policeStationId, startDate, endDate) => {
    setAuthToken(AxiosUtility)
    const res = await AxiosUtility.get(`/sessions/police_station_session?policeId=${policeStationId}&startDate=${startDate}&endDate=${endDate}`);

    return res.data;
}

const SessionServices = {
    getAmbulanceSession,
    getHospitalSession,
    getFireFighterSession,
    getPoliceStationSession
}

export default SessionServices;