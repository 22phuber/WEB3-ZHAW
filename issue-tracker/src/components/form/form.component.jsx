import React, { useState } from "react";

import './form.styles.css';

const Form = props => {
    return (
      <form action={props.action} method={props.method}>
        {props.children}
      </form>
    );
};
  
export default Form;