import React, { Component } from "react";
// material-ui
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { withStyles } from "@material-ui/core/styles";

import Issue from "../issue/issue.component";
import Loading from "../loading/loading.component";
import NewIssuePopup from "../newIssuePopup/newIssuePopup.component";
import "./issues.styles.css";

import { payloads, client_uuid, herokuApi } from "../../data/project.data";

const styles = {
  button: {}
};

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectid: this.props.projectId,
      showPopup: false
    };
    this.fetchRemoteIssues = this.fetchRemoteIssues.bind(this);
    this.createRemoteIssue = this.createRemoteIssue.bind(this);
    this.updateRemoteIssue = this.updateRemoteIssue.bind(this);
    this.deleteRemoteIssue = this.deleteRemoteIssue.bind(this);
  }

  setPopupState = value => {
    this.setState({
      showPopup: value
    });
  };

  createdNewIssue = data => {
    this.setPopupState(false);
    this.createRemoteIssue(data);
    this.fetchRemoteIssues();
  };

  async createRemoteIssue(issueData) {
    // current
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();
    // due date
    var due = new Date(issueData.dueDate);
    const dueISOTimeStamp = due.toISOString();

    try {
      const response = await fetch(
        herokuApi.projects + "/" + this.state.projectid + "/issues",
        {
          method: "POST",
          headers: {
            Accept: herokuApi.contentType,
            "Content-Type": herokuApi.contentType
          },
          body: JSON.stringify({
            ...payloads.issue,
            title: issueData.issueTitle,
            due_date: dueISOTimeStamp,
            created_at: currentISOTimeStamp,
            updated_at: currentISOTimeStamp,
            priority: issueData.issuePriority
          })
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.fetchRemoteIssues();
    } catch (error) {
      console.log(error);
    }
  }

  async fetchRemoteIssues() {
    if (
      localStorage.getItem(client_uuid) &&
      localStorage.getItem(client_uuid) !== ""
    ) {
      try {
        const response = await fetch(
          herokuApi.projects + "/" + this.state.projectid + "/issues",
          {
            method: "GET",
            headers: {
              Accept: herokuApi.contentType,
              "Content-Type": herokuApi.contentType
            }
          }
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const responseJson = await response.json();
        this.setState({ issues: responseJson });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateRemoteIssue(issueData) {
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();

    try {
      const response = await fetch(
        herokuApi.projects +
          "/" +
          issueData.project_id +
          "/issues/" +
          issueData.id,
        {
          method: "PUT",
          headers: {
            Accept: herokuApi.contentType,
            "Content-Type": herokuApi.contentType
          },
          body: JSON.stringify({
            ...issueData,
            done: issueData.done,
            title: issueData.title,
            due_date: issueData.due_date,
            created_at: issueData.created_at,
            updated_at: currentISOTimeStamp,
            priority: issueData.priority
          })
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.fetchRemoteIssues();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRemoteIssue(issueData) {
    try {
      const response = await fetch(
        herokuApi.projects +
          "/" +
          issueData.project_id +
          "/issues/" +
          issueData.id,
        {
          method: "DELETE",
          headers: {
            Accept: herokuApi.contentType,
            "Content-Type": herokuApi.contentType
          }
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.fetchRemoteIssues();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.fetchRemoteIssues();
  }

  render() {
    const {
      issues = this.state.issues,
      projectid = this.state.projectid
    } = this;

    if (issues) {
      const { classes } = this.props;
      return (
        <div className="Issues">
          <NewIssuePopup
            show={this.state.showPopup}
            title={"New issue"}
            onCloseRequest={() => this.setPopupState(false)}
            onNewIssueCreated={this.createdNewIssue}
          />
          <div className="issues-header">
            <h1>Issues [{issues.length || "0"}]</h1>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => this.setPopupState(true)}
            >
              Create Issue
            </Button>
          </div>
          <div>
            <div className="issues-heading-table">
              <div className="issues-heading-done">Done</div>
              <div className="issues-heading-desc">Description</div>
              <div className="issues-heading-prio">Prio</div>
              <div className="issues-heading-due">Due date</div>
              <div className="issues-heading-delete">Delete</div>
            </div>
            {issues.map(issue => (
              <Issue
                updateRemoteIssue={this.updateRemoteIssue}
                deleteRemoteIssue={this.deleteRemoteIssue}
                key={issue.id}
                issue={issue}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default withStyles(styles)(Issues);
