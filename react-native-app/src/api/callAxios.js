import axios from "axios";
import { apiAdress } from "./apiAddress";

export const callAxios = async (endpoint, method, config = null) => {
        return await axios({
            method: method,
            url: `${apiAdress}${endpoint}`,
            config
        })
        .catch((error) => {
          console.log('Lỗi: ' + error);
        })
      }
