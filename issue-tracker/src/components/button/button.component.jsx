import React from "react";

import './button.styles.css';

const Button = ({ clickHandler, className, buttonText, ...otherProps }) => {
  return (
    <button onClick={clickHandler} className={"Button "+className} {...otherProps}>{buttonText}</button>
  )
}

export default Button;