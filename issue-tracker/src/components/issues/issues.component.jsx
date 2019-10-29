import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Issue from "../issue/issue.component";
import Loading from "../loading/loading.component";
import Button from "../button/button.component";
import NewIssuePopup from "../newIssuePopup/newIssuePopup.component";

import "./issues.styles.css";

import { client_uuid, herokuApi } from "../../data/project.data";

class Issues extends Component {


  constructor(props) {
    super(props);

    this.state = {
      projectid: this.props.projectId,
      showPopup: false
    };

  }

  setPopupState = (value) => {
    this.setState({
        showPopup: value
    });
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
          <NewIssuePopup show={this.state.showPopup} title={"New issue"}
            onCloseRequest={() => this.setPopupState(false)}
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
          <Button buttonText={<FontAwesomeIcon icon={faPlus}/>}
            clickHandler={() => this.setPopupState(true)}
          />
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
}

export default Issues;
