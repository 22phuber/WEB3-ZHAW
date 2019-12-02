import React from "react";
// material-ui
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

import * as HerokuAPI from "../api/heroku.api";

import "./issue.styles.css";

const useStyles = makeStyles(theme => ({
  button: {}
}));

const Issue = ({ issue, updateRemoteIssue, deleteRemoteIssue, projectId, setGetIssuesStatus, startLoadingIssues }) => {
  const updateIssue = issueData => {
    HerokuAPI.putIssue(projectId, issueData.id, issueData.title, issueData.due_date, issueData.priority, issueData.done);
  };

  const deleteIssue = issueData => {
    setGetIssuesStatus(HerokuAPI.loadingState.loading);
    HerokuAPI.deleteIssue(projectId, issueData.id, startLoadingIssues);
  };

  const classes = useStyles();

  if (issue) {
    const dateOptions = {
      timeZone: "Europe/Zurich",
      hour12: false
    };
    const prettyDueDate = new Date(issue.due_date)
      .toLocaleString("de-DE", dateOptions)
      .replace(/(.*)\D\d+/, "$1");
    return (
      <div className="Issue">
        <div className="issue-done">
          <Checkbox
            color="primary"
            defaultChecked={issue.done}
            onChange={event =>
              updateIssue({ ...issue, done: event.target.checked })
            }
            value="done"
            title="Set issue to done/undone"
            inputProps={{
              "aria-label": "Set issue to done/undone"
            }}
          />
        </div>
        <div className="issue-title">{issue.title}</div>
        <div className="issue-priority">{issue.priority}</div>
        <div className="issue-due">{prettyDueDate}</div>
        <div className="issue-delete">
          <IconButton
            className={classes.button}
            color="secondary"
            aria-label="delete"
            onClick={() => deleteIssue(issue)}
            title="Delete Issue"
          >
            <DeleteForever />
          </IconButton>
        </div>
      </div>
    );
  } else {
    return <div className="Issue">No issues found</div>;
  }
};

export default Issue;
