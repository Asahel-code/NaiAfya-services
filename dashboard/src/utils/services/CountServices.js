import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchCount = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/count/");

    return res.data;
}

const CountServices = {
    fetchCount
}

export default CountServices;
