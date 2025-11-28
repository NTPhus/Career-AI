import{api} from "../axios/axios"

export const predictMajor = (data) => api.post("major/predict", data);

export const searchMajor = (data) => api.post("major/search", data);

export const getListMajor = (data) => api.get("major", data);