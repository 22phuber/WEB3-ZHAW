import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//import { Button } from '../button/button.component.jsx';
 
import "./issue.styles.css";

const Issue = ({ issue }) => {
  if (issue) {
    return (
      <div key={issue.id} className="Issue">
        <input type="checkbox" checked={issue.done} />
        <div>{issue.title}</div>
        <div>{issue.priority}</div>
        <div>{issue.due_date}</div>
        <div>{issue.due_date}</div>
        <div><FontAwesomeIcon icon={faTrashAlt}/></div>
      </div>
    );
  } else {
    return (<div className="Issue">No issues found</div>);
  }
};

export default Issue;
