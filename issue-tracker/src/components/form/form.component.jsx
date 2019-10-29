import React from "react";

import './form.styles.css';

const Form = props => {

  const handleSubmit = (event) => {
    event.preventDefault();
    let jsonObject = {};

    for (const [key, value] of new FormData(event.target).entries()) {
      jsonObject[key] = value;
    }
    props.newIssueData(jsonObject);
  }

  return (
    <form className={"Form"} onSubmit={handleSubmit} method={props.method}>
      {props.children}
    </form>
  );
};

export default Form;