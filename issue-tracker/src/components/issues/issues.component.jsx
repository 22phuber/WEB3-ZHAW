import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Issue from "../issue/issue.component";
import Loading from "../loading/loading.component";
import Button from "../button/button.component";
import NewIssuePopup from "../newIssuePopup/newIssuePopup.component";

import "./issues.styles.css";

import { payloads, client_uuid, herokuApi } from "../../data/project.data";

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectid: this.props.projectId,
      showPopup: false
    };
  }

  setPopupState = value => {
    this.setState({
      showPopup: value
    });
  };

  createdNewIssue = data => {
    this.setPopupState(false);
    this.createRemoteIssue(data);
    this.fetchIssues();
  };

  createRemoteIssue(data) {
    // current
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();
    // due date
    var due = new Date(data.dueDate);
    const dueISOTimeStamp = due.toISOString();

    fetch(herokuApi.projects + "/" + this.state.projectid + "/issues", {
      method: "POST",
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: JSON.stringify({
        ...payloads.issue,
        title: data.issueTitle,
        due_date: dueISOTimeStamp,
        created_at: currentISOTimeStamp,
        updated_at: currentISOTimeStamp,
        priority: data.issuePriority
      })
    })
      .then(response => response.json())
      .then(this.fetchIssues())
      .catch(error => console.log(error));
  }

  fetchIssues() {
    if (
      localStorage.getItem(client_uuid) &&
      localStorage.getItem(client_uuid) !== ""
    ) {
      fetch(herokuApi.projects + "/" + this.state.projectid + "/issues", {
        method: "GET",
        headers: {
          Accept: herokuApi.contentType,
          "Content-Type": herokuApi.contentType
        }
      })
        .then(response => response.json())
        .then(data => this.setState({ issues: data }))
        .catch(error => console.log(error));
    }
  }

  componentDidMount() {
    this.fetchIssues();
  }

  render() {
    const {
      issues = this.state.issues,
      projectid = this.state.projectid
    } = this;

    if (issues) {
      return (
        <div className="Issues">
          <NewIssuePopup
            show={this.state.showPopup}
            title={"New issue"}
            onCloseRequest={() => this.setPopupState(false)}
            onNewIssueCreated={this.createdNewIssue}
          />
          <h1>Issues</h1>
          <div>
            Issue count {issues.length || "0"} for {projectid}
          </div>
          <div>
            {issues.map(issue => (
              <Issue key={issue.id} issue={issue} />
            ))}
          </div>
          <Button
            buttonText={<FontAwesomeIcon icon={faPlus} />}
            clickHandler={() => this.setPopupState(true)}
          />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Issues;
