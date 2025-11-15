import{api} from "../axios/axios"

export const predictMajor = (data) => api.post("major/predict", data);