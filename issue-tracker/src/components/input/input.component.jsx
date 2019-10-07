import React, { useState } from "react";
import PropTypes from 'prop-types';

import './input.styles.css';

const types = {
  button: 'button',
  checkbox: 'checkbox',
  color: 'color',
  date: 'date',
  datetimelocal: 'datetime-local',
  email: 'email',
  file: 'file',
  hidden: 'hidden',
  image: 'image',
  month: 'month',
  number: 'number',
  password: 'password',
  radio: 'radio',
  range: 'range',
  reset: 'reset',
  search: 'search',
  submit: 'submit',
  tel: 'tel',
  test: 'text',
  time: 'time',
  url: 'url',
  week: 'week'
}

const Input = props => {
  return (
    <>
      <label for={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} name={props.name}
        placeholder={props.placeholder} required={props.required || false} />
    </>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(Object.keys(types))
}

Input.types = types;

export default Input;