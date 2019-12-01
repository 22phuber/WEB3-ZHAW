import React from "react";
import Clock from "../clock/clock.component";

import "./header.styles.css";

const Header = props => {
  return (
    <div className={"Header".concat(props.darkMode ?  " HeaderDark" : " HeaderLight")}>
      <h1>{props.appTitle}</h1>
      <div>
        <Clock />
      </div>
    </div>
  );
};

export default Header;
