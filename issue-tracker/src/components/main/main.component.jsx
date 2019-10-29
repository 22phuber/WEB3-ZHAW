import React, { Component } from "react";
import Tabs from "../tabs/tabs.component";
import Issues from "../issues/issues.component";

import "./main.styles.css";

import { payloads, client_uuid, herokuApi } from "../../data/project.data";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
    this.fetchRemoteProjects = this.fetchRemoteProjects.bind(this);
    this.createRemoteProject = this.createRemoteProject.bind(this);
  }

  createRemoteProject(projectData) {
    // current
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();

    fetch(herokuApi.projects, {
      method: "POST",
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: JSON.stringify({
        ...payloads.project,
        title: projectData.projectTitle,
        created_at: currentISOTimeStamp,
        updated_at: currentISOTimeStamp
      })
    })
      .then(response => {
        response
          .json()
          .then(responeJSON => {
            // Add new id to localStorage
            if (responeJSON.id) {
              localStorage.setItem(
                client_uuid,
                (localStorage.getItem(client_uuid) || "") +
                  JSON.stringify(responeJSON.id) +
                  ","
              );
            }
            this.fetchRemoteProjects();
          });
      })
      .catch(error => console.log(error));
  }

  fetchRemoteProjects() {
    if (
      localStorage.getItem(client_uuid) &&
      localStorage.getItem(client_uuid) !== ""
    ) {
      const projectIds = localStorage
        .getItem(client_uuid)
        .split(",")
        .filter(Boolean)
        .map(Number);

      const promises = projectIds.map(id =>
        fetch(herokuApi.projects + "/" + id)
      );

      Promise.all(promises)
        .then(res => {
          const responses = res.map(response => response.json());
          return Promise.all(responses);
        })
        .then(data => {
          this.setState({ data: data });
        });
    }
  }

  componentDidMount() {
    this.fetchRemoteProjects();
  }

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <div className="Main">
          <Tabs createRemoteProject={this.createRemoteProject}>
            {data.map((project,index) => (
              <div key={project.id} label={project.title}>
                <Issues key={project.id+'-'+index} project={project.title} projectId={project.id} />
              </div>
            ))}
          </Tabs>
        </div>
      );
    } else {
      return <div className="Main"></div>;
    }
  }
}

export default Main;
