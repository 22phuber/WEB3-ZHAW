import React, { Component } from "react";
import Issue from "../issue/issue.component";
import Loading from "../loading/loading.component";

import "./issues.styles.css";

import { client_uuid, herokuApi } from "../../data/project.data";

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectid: this.props.projectId
    };
  }

  componentDidMount() {
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
        .then(data => this.setState({ issues: data }));
    }
  }

  render() {
    const { issues = this.state.issues, projectid = this.state.projectid } = this;

    if (issues) {
      return (
        <div className="Issues">
          <h1>Issues</h1>
          <div>
            Issue count {issues.length || "0"} for {projectid}
          </div>
          <div>
            {issues.map(issue => (
              <Issue key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <Loading />
        /*<div className="Issues">
          <h1>Issues</h1>
          <div>No Issues found</div>
          <div>Projectid: {projectid}</div>
        </div>*/
      );
    }
  }
}

export default Issues;
