import React from "react";

import './modal.styles.css';

const Modal =  props  => {
  if(props.show){
    return (
      <div className="Modal">
      </div>
    );
  } else {
    return null;
  }
};
  
export default Modal;