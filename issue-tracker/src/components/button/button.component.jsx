import React from "react";

import './button.styles.css';

const Button = (props) => {
  return (
    <button 
      id={props.elementId} 
      className={"Button "+props.classes} 
      type={props.type} 
      disabled={props.disabled||false} 
      name={props.name} 
      onClick={props.clickHandler}>
    {props.text}
    </button>
  )
}

export default Button;