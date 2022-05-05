import { CitiesJson } from "../ts/interfaces/interfaces";

export const parseCitiesList = (citiesList:CitiesJson[]) => {
  return citiesList.map((item) => item.city);
};

export const filterCities = (rule: Function, citiesList:CitiesJson[]) => {
  const filteredArr: CitiesJson[] = [];

  citiesList.forEach((element) => {
    if (rule(element)) filteredArr.push(element);
  });

  return filteredArr;
};

export const sortCities = (citiesList:CitiesJson[]) => {
  return citiesList
    .map((item: CitiesJson) => ({ city: item.city, population: item.population }))
    .sort((a, b) => a.city.localeCompare(b.city));
};
