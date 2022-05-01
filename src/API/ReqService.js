import axios from "axios";

export default class ReqService {
  static async getUniversities(country = "United+Kingdom") {
    const response = await axios.get(
      "http://universities.hipolabs.com/search",
      {
        params: {
          _country: country,
        },
      }
    );
    return response;
  }
}
