import React, { useState, useEffect } from "react";
import style from "./StatusTooltip.module.scss";

const StatusTooltip = ({ tooltipText }) => {
  return (
    <div className={style["tooltip"]}>
      <span className={style["tooltiptext"]}>{tooltipText}</span>
    </div>
  );
};

export default StatusTooltip;
