import AxiosUtility, { setAuthToken } from "./AxiosServices";

const login = async (data) => {
  const res = await AxiosUtility.post("/auth/", data);

  return res.data;
}

const verifyAccount = async (data) => {
  setAuthToken(AxiosUtility);
  const res = await AxiosUtility.post("/auth/verifyAccount", data);

  return res.data;
}

const resendVerificationToken = async () => {
  setAuthToken(AxiosUtility);
  const res = await AxiosUtility.get("/auth/resendVerificationToken");

  return res.data;
}

const requestPasswordReset = async (data) => {
  const res = await AxiosUtility.post("/auth/passwordResetRequest", data);

  return res.data;
}

const resetPassword = async (data) => {
  const res = await AxiosUtility.post("/auth/resetPassword", data);

  return res.data;
}

const fetchUser = async () => {
  setAuthToken(AxiosUtility);
  const res = await AxiosUtility.get("/auth/user");

  return res.data;
}

const updateUser = async (data) => {
  setAuthToken(AxiosUtility);
  const res = await AxiosUtility.patch("/auth/user/update_profile", data);

  return res.data;
}


const AuthServices = { login, requestPasswordReset, resetPassword, verifyAccount, resendVerificationToken, fetchUser, updateUser };


export default AuthServices;