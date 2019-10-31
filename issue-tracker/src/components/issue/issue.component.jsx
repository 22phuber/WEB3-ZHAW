import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./issue.styles.css";

const Issue = ({ issue, updateRemoteIssue, deleteRemoteIssue }) => {

  const updateIssue = issueData => {
    updateRemoteIssue(issueData);
  };

  const deleteIssue = issueData => {
    deleteRemoteIssue(issueData);
  };

  if (issue) {
    return (
      <div className="Issue">
        <input
          type="checkbox"
          defaultChecked={issue.done}
          onChange={(event) => updateIssue({...issue,done:event.target.checked})}
        />
        <div>{issue.title}</div>
        <div>{issue.priority}</div>
        <div>{issue.due_date}</div>
        <div onClick={() => deleteIssue(issue)} title="Delete this issue">
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
    );
  } else {
    return <div className="Issue">No issues found</div>;
  }
};

export default Issue;
