import ReqService from "../API/ReqService";

export const parseUniversitiesList = (universitiesList) => {
  const data = async (universitiesList) => {
    const response = await ReqService.getUniversities();
    const data = response.data.map((item) => item.name);
    return data;
  };
  return data();
};
