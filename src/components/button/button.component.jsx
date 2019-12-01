import React from "react";

import './button.styles.css';

const Button = ({ clickHandler, className, buttonText, ...otherProps }) => {
  const addClassNames = (className===undefined)?"":className;
  return (
    <button onClick={clickHandler} className={"Button "+addClassNames} {...otherProps}>{buttonText}</button>
  )
}

export default Button;