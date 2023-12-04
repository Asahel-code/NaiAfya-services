import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchAllFireFighters = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/fire_fighter/");

    return res.data;
}

const fetchSpecificFireFighter = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/fire_fighter/${id}`);

    return res.data;
}

const addFireFighter = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/fire_fighter/", data);

    return res.data;
}

const updateFireFighter = async (data, id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/fire_fighter/${id}`, data);

    return res.data;
}

const deleteFireFighter = async (id) => {
    const res = await AxiosUtility.delete(`/fire_fighter/${id}`);

    return res.data;
}


const FireFighterServices = {
    fetchAllFireFighters,
    fetchSpecificFireFighter,
    addFireFighter,
    updateFireFighter,
    deleteFireFighter
};

export default FireFighterServices;