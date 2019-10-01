import React from "react";

import './button.styles.css';

const Button = ({ onClick, text }) => {
  return (
  <button className="Button btn btn-primary" onClick={onClick}>{text}</button>
  )
}



export default Button;