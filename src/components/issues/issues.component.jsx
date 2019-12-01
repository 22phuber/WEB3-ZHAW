import React from "react";
import Issue from "../issue/issue.component";
import "./issues.styles.css";

const Issues = props => {
  return (
    <div className="issue-main">
      <div className="issue-section">
        <h1>Issues: {props.issueData.length || "0"}</h1>
        <div className="issues-heading-table">
          <div className="issues-heading-done">Done</div>
          <div className="issues-heading-desc">Description</div>
          <div className="issues-heading-prio">Prio</div>
          <div className="issues-heading-due">Due date</div>
          <div className="issues-heading-delete">Delete</div>
        </div>
        <div className="issue-list">
          {props.issueData.map(issue => (
            <Issue
              projectId={props.projectId}
              updateRemoteIssue={props.updateRemoteIssue}
              deleteRemoteIssue={props.deleteRemoteIssue}
              setGetIssuesStatus={props.setGetIssuesStatus}
              startLoadingIssues={props.startLoadingIssues}
              key={issue.id}
              issue={issue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Issues;
