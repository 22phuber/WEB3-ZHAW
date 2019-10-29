import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './popup.styles.css';
import Modal from "../modal/modal.component";
import Form from "../form/form.component";
import Input from "../input/input.component";
import Button from "../button/button.component";

import '../input/input.styles.css';

const NewIssuePopup = props => {
  if (props.show) {
    return (
      <>
        <Modal show={props.show} />
        <div className="Popup">
          <h1>{props.title}</h1>
          <Button buttonText={<FontAwesomeIcon icon={faTimes} />}
            clickHandler={props.onCloseRequest} />
          <hr />
          <Form action={"https://dublin.zhaw.ch/~bkrt/cgi/showenv.cgi"} method={"POST"}
            children={
              <>
                <Input type={Input.types.title} id={"issueTitle"} autocomplete={"off"}
                  name={"issueTitle"} placeholder={"Name of new Issue"} required={true} label={"Title"} />
                <label className="Label">Priority</label>
                <div className="SingleInput">
                  <select id="issuePriority" className="Input">
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                    <option value="4">Lowest</option>
                  </select>
                </div>
                <Input type={Input.types.date} id={"dueDate"} autocomplete={"off"}
                  name={"dueDate"} required={true} label={"Due date"} />
                <Input type={Input.types.submit} id={"submit"} name={"submit"} value={"send"} />
              </>
            } />
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default NewIssuePopup;