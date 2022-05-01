import React, { useState, useEffect, useRef, useContext } from "react";
import { filterCities, sortCities } from "../../../utils/cities";
import { parseUniversitiesList } from "../../../utils/universities";
import citiesListSource from "../../../cities.json";
import style from "./Form.module.scss";
import { Context } from "../../../context/index";
import DateTimeService from "../../../utils/dateTime";

const Form = () => {
  const [universitiesList, setUniversitiesList] = useState("");
  const [citiesList, setCitiesList] = useState("");
  const { tooltipText, setTooltipText } = useContext(Context);
  const [lastChangedDateTime, setLastChangedDateTime] = useState(
    "15 мая 2012 г. в 14:55:17"
  );
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordRepeatValid, setPasswordRepeatValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [validationSuccessfull, setValidationSuccessfull] = useState(false);

  const formData = useRef();

  async function getUniversities() {
    const data = await parseUniversitiesList();
    setUniversitiesList(data);
  }

  const citiesListPrepare = (cities) => {
    const filteredCitiesList = filterCities(
      (item) => item.population > 50000,
      cities
    );

    const sortedAndFilteredCitiesList = sortCities(filteredCitiesList);

    const populationList = sortedAndFilteredCitiesList.map(
      (item) => item.population
    );

    const temp = sortedAndFilteredCitiesList[0];
    sortedAndFilteredCitiesList[0] =
      sortedAndFilteredCitiesList[
        populationList.indexOf(Math.max(...populationList).toString())
      ];
    sortedAndFilteredCitiesList[
      populationList.indexOf(Math.max(...populationList).toString())
    ] = temp;

    setCitiesList(sortedAndFilteredCitiesList.map((item) => item.city));
  };

  useEffect(() => {
    getUniversities();
    citiesListPrepare(citiesListSource);
  }, [formData]);

  const validateFormFields = (e) => {
    e.preventDefault();
    const [password, passwordRepeat, email] = [
      formData.current[2].value,
      formData.current[3].value,
      formData.current[4].value,
    ];

    setPasswordValid(false);
    setPasswordRepeatValid(false);
    setEmailValid(false);

    if (!password) {
      setPasswordError("Укажите пароль");
    } else if (password.length < 5)
      setPasswordError("Используйте не менее 5 символов");
    else {
      setPasswordError("");
      setPasswordValid(true);
    }

    if (!passwordRepeat) setPasswordRepeatError("Укажите пароль");
    else if (passwordRepeat !== password)
      setPasswordRepeatError("Пароли не совпадают");
    else {
      setPasswordRepeatError("");
      setPasswordRepeatValid(true);
    }

    if (!email) setEmailError("Укажите E-mail");
    else if (
      !RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)
    )
      setEmailError("Неверный E-mail");
    else {
      setEmailError("");
      setEmailValid(true);
    }

    setTimeout(() => {
      setValidationSuccessfull(true, sendForm(e));
    }, 5000);
  };

  const sendForm = (e) => {
    e.preventDefault();

    const [city, university, password, passwordRepeat, email] = [
      ...formData.current,
    ].map((item) => item.value);
    const acceptCheckbox = formData.current[5].checked;

    const json = {
      city,
      university,
      password,
      passwordRepeat,
      email,
      acceptCheckbox,
      tooltipText,
    };

    // validateFormFields();
    console.log(passwordValid, passwordRepeatValid, emailValid);

    if (passwordValid && passwordRepeatValid && emailValid) {
      console.log(json);

      setLastChangedDateTime(
        `${new DateTimeService().getDate()} в ${new DateTimeService().getTime()}`
      );
    }
  };

  return (
    <div className={style.form}>
      <form ref={formData}>
        <div className={style["content-line"]}>
          <label
            className={
              style["main-label"] + " " + style["content-line__main-label"]
            }
            htmlFor="city"
          >
            Ваш город
          </label>

          <div className={style["content-line__hint-box"]}>
            <select
              className={style["select"] + " " + style["content-line__select"]}
              name="city-select"
              id="city"
            >
              {[...citiesList].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={style["content-line"]}>
          <label
            className={
              style["main-label"] + " " + style["content-line__main-label"]
            }
            htmlFor="university"
          >
            Ваш университет
          </label>
          <div className={style["content-line__hint-box"]}>
            <select
              className={style["select"] + " " + style["content-line__select"]}
              name="university-select"
              id="university"
            >
              {[...universitiesList].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className={style.hr} />

        <div className={style["content-line"]}>
          <label
            className={
              style["main-label"] + " " + style["content-line__main-label"]
            }
            htmlFor="password"
          >
            Пароль
          </label>
          <div className={style["content-line__hint-box"]}>
            <input
              className={
                style["input"] +
                " " +
                style["content-line__input"] +
                (passwordError && " " + style["input-error"])
              }
              type="password"
              id="password"
            />
            <div
              className={
                style["error-text"] + " " + style["content-line__error-text"]
              }
            >
              {passwordError}
            </div>
            <div className={style["hint"] + " " + style["content-line__hint"]}>
              Ваш новый пароль должен содержать не менее 5 символов.
            </div>
          </div>
        </div>

        <div className={style["content-line"]}>
          <label
            className={
              style["main-label"] + " " + style["content-line__main-label"]
            }
            htmlFor="password-repeat"
          >
            Пароль еще раз
          </label>
          <div className={style["content-line__hint-box"]}>
            <input
              className={
                style["input"] +
                " " +
                style["content-line__input"] +
                (passwordRepeatError && " " + style["input-error"])
              }
              type="password"
              id="password-repeat"
            />
            <div
              className={
                style["error-text"] + " " + style["content-line__error-text"]
              }
            >
              {passwordRepeatError}
            </div>
            <div className={style["hint"] + " " + style["content-line__hint"]}>
              Повторите пароль, пожалуйста, это обезопасит вас с нами на случай
              ошибки.
            </div>
          </div>
        </div>

        <hr className={style.hr} />

        <div className={style["content-line"]}>
          <label
            className={
              style["main-label"] + " " + style["content-line__main-label"]
            }
            htmlFor="email"
          >
            Электронная почта
          </label>
          <div className={style["content-line__hint-box"]}>
            <input
              className={
                style["input"] +
                " " +
                style["content-line__input"] +
                (emailError && " " + style["input-error"])
              }
              type="text"
              id="email"
            />
            <div
              className={
                style["error-text"] + " " + style["content-line__error-text"]
              }
            >
              {emailError}
            </div>
            <div className={style["hint"] + " " + style["content-line__hint"]}>
              Можно изменить адрес, указанный при регистрации.
            </div>
          </div>
        </div>

        <div className={style["content-line"]}>
          <label
            className={
              style["main-label"] + " " + style["content-line__main-label"]
            }
            htmlFor="agree"
          >
            Я согласен
          </label>
          <div className={style["content-line__hint-box"]}>
            <input
              className={
                style["checkbox"] + " " + style["content-line__checkbox"]
              }
              type="checkbox"
              id="agree"
              defaultChecked
            />
            <label
              className={
                style["checkbox-text"] +
                " " +
                style["content-line__checkbox-text"]
              }
              htmlFor="agree"
            >
              принимать актуальную информацию на емейл
            </label>
          </div>
        </div>

        <div
          className={
            style["content-line"] + " " + style["content-line-top-margin"]
          }
        >
          <div className={style["content-line__hint-box"]}>
            <button
              type="submit"
              className={style["button"] + " " + style["content-line__button"]}
              onClick={(e) => {
                validateFormFields(e);
              }}
            >
              Изменить
            </button>
            <div className={style["hint"] + " " + style["content-line__hint"]}>
              последние изменения {lastChangedDateTime}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
