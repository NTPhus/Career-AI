import { api } from "../axios/axios";

//lấy all trường
export const getAllSchool = () => api.get("university")
export const findUniversity = (values) => api.post("university/search", values);