import axios from "axios";
import { BASE_URL } from "./header";



export const sendChatMessage = async (message) => {
  const response = await axios.post(`${BASE_URL}/api/chat`, {
    message: message,
  });

  return response.data.answer;
};
