import { api } from "../axios/axios";

//lấy all trường
export const getAllSchool = () => api.get("university")