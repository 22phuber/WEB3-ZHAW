import React from "react";

import './form.styles.css';

const Form = props => {
    return (
      <form className={"Form"} action={props.action} method={props.method}>
        {props.children}
      </form>
    );
};
  
export default Form;