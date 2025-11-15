import{api} from "../axios/axios"

//Lấy all câu hỏi
export const getQuestion = () => api.get("question")