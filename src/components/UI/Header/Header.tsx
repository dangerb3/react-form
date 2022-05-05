import React, { useState,  useContext, FormEvent } from "react";
import style from "./Header.module.scss";
import StatusTooltip from "../StatusTooltip/StatusTooltip";
import { Context } from "../../../context";

const Header = ():JSX.Element => {
  const { tooltipText, setTooltipText } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);

  const isEditingToggle = (e: FormEvent) => {
    e.preventDefault();
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  return (
    <div className={style["header"]}>
      <div className={style["content-line"]}>
        <h1 className={style["title"] + " " + style["header__title"]}>
          Здравствуйте,{" "}
          <strong className={style["title-black"]}>Человек №3596941</strong>
        </h1>
        <a
          className={style["status-link"] + " " + style["header__status-link"]}
          href="#"
          onClick={isEditingToggle}
        >
          Сменить статус
        </a>
      </div>
      <div className={style["tooltip-box"]}>
        {isEditing ? (
          <input
            type="text"
            className={style["input"] + " " + style["tooltip-box__input"]}
            defaultValue={tooltipText}
            onChange={(e) => {
              setTooltipText(e.target.value);
            }}
          />
        ) : (
          <StatusTooltip tooltipText={tooltipText} />
        )}
      </div>
    </div>
  );
};

export default Header;
