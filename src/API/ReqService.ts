import axios from "axios";
import {
  AxiosError
} from "axios";

export default class ReqService {
  static async getUniversities(country = "United+Kingdom") {
    try {
      const response = await axios.get(
        "http://universities.hipolabs.com/search", {
          params: {
            _country: country,
          },
        }
      );
      return response;
    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.data)
    }
  }
}