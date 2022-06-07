import axios from "axios";

export default class ReqService {
  static async getUniversities(url) {
    const response = await axios(url);
    return response;
  }
}
