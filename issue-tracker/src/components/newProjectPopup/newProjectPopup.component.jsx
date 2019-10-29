import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './popup.styles.css';
import Modal from "../modal/modal.component";
import Form from "../form/form.component";
import Input from "../input/input.component";
import Button from "../button/button.component";

import '../input/input.styles.css';

const NewProjectPopup = props => {

  if (props.show) {
    return (
      <>
        <Modal show={props.show} />
        <div className="Popup">
          <h1>{props.title}</h1>
          <Button buttonText={<FontAwesomeIcon icon={faTimes} />}
            clickHandler={props.onCloseRequest} />
          <hr />
          <Form newIssueData={props.onNewProjectCreated}
            children={
              <>
                <Input type={Input.types.title} id={"projectTitle"} autocomplete={"off"}
                  name={"projectTitle"} placeholder={"Name of new Project"} required={true} label={"Title"} />
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

export default NewProjectPopup;