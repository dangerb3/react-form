import ReqService from "../API/ReqService";
import universitiesListSource from "../universities.json";

export const parseUniversitiesList = (universitiesList) => {
  // There are CORS issue on server. Applied temporary decision with ready request

  const data = async (universitiesList) => {
    const url =
      "http://universities.hipolabs.com/search?_country=United+Kingdom";
    const response = await ReqService.getUniversities(url);
    const data = response.data.map((item) => item.name);
    return data;
  };
  return universitiesListSource.map((item) => item.name);

  // return data();
};
