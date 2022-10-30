import axios from "axios";
import { apiAdress } from "./apiAddress";

export const callAxios = async (endpoint, method, params) => {
        return await axios({
            method: method,
            url: `${apiAdress}/${endpoint}`,
            data: params
        })
        .catch((error) => {
          console.log('Lỗi: ' + error);
        })
      }
