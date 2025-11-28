import { api } from "../axios/axios";

export const getAllLocation = () => api.get('location')