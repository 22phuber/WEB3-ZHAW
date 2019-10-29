import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './popup.styles.css';
import Modal from "../modal/modal.component";
import Form from "../form/form.component";
import Input from "../input/input.component";
import Button from "../button/button.component";


const NewIssuePopup = props => {
  if (props.show) {
    return (
      <>
        <Modal show={props.show}/>
        <div className="Popup">
        <h1>{props.title}</h1>
        <Button buttonText={<FontAwesomeIcon icon={faTimes}/>}
        clickHandler={props.onCloseRequest} />
        <hr />
          <Form action={"https://dublin.zhaw.ch/~bkrt/cgi/showenv.cgi"} method={"POST"}
            children={
              <>
                <Input type={Input.types.title} id={"issueTitle"} autocomplete={"off"}
                  name={"issueTitle"} placeholder={"Name of new Issue"} required={true} label={"issueTitle"} />
                <Input type={Input.types.date} id={"dateId"}
                  name={"dateName"} required={false} label={"date"} autocomplete={"off"} />
                  <Input type={Input.types.email} id={"secondEmail"} autocomplete={"off"}
                  name={"emailName"} placeholder={"email@test.com"} required={true} label={"email"} />
                <Input type={Input.types.date} id={"secondDateId"}
                  name={"dateName"} required={false} label={"date"} autocomplete={"off"} />
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