import moment from "moment";

import "moment/locale/ru";
import "moment/locale/en-gb";

export default class DateTimeService {
  constructor(locale = "ru") {
    moment.locale(locale);
  }

  getDate(format = "LL") {
    return moment().format(format);
  }

  getTime(format = "LTS") {
    return moment().format(format);
  }
}
