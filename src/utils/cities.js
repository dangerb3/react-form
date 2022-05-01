export const parseCitiesList = (citiesList) => {
  return citiesList.map((item) => item.city);
};

export const filterCities = (rule, citiesList) => {
  const filteredArr = [];

  citiesList.forEach((element) => {
    if (rule(element)) filteredArr.push(element);
  });

  return filteredArr;
};

export const sortCities = (citiesList) => {
  return citiesList
    .map((item) => ({ city: item.city, population: item.population }))
    .sort((a, b) => a.city.localeCompare(b.city));
};
