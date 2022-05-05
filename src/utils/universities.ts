import ReqService from "../API/ReqService";

interface universitiesResponse {
  alpha_two_code: string,
    domains: string[],
    country: string,
    'state-province': string,
    web_pages: string[],
    name: string
}

export const parseUniversitiesList = (country?: string) => {
  const data = async () => {
    const response = await ReqService.getUniversities(country);
    const data = response!.data.map((item: universitiesResponse) => item.name);
    return data;
  };
  return data();
};
