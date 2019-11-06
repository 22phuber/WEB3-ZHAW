import React, { Component } from "react";
import Tabs from "../tabs/tabs.component";
import Issues from "../issues/issues.component";

import "./main.styles.css";

import { payloads, client_uuid, herokuApi } from "../../data/heroku.api";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
    this.fetchRemoteProjects = this.fetchRemoteProjects.bind(this);
    this.createRemoteProject = this.createRemoteProject.bind(this);
  }

  async createRemoteProject(projectData) {
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();
    try {
      const response = await fetch(herokuApi.projects, {
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
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const responseJson = await response.json();
      // Add new id to localStorage
      if (responseJson.id) {
        localStorage.setItem(
          client_uuid,
          (localStorage.getItem(client_uuid) || "") +
            JSON.stringify(responseJson.id) +
            ","
        );
      }
      this.fetchRemoteProjects();
    } catch (error) {
      console.log(error);
    }
  }

  async fetchRemoteProjects() {
    if (
      localStorage.getItem(client_uuid) &&
      localStorage.getItem(client_uuid) !== ""
    ) {
      const projectIds = localStorage
        .getItem(client_uuid)
        .split(",")
        .filter(Boolean)
        .map(Number);

      try {
        const responses = await Promise.all(
          projectIds.map(async id => await fetch(herokuApi.projects + "/" + id))
        );
        const responsesJson = await Promise.all(
          responses.map(async response => await response.json())
        );
        this.setState({ data: responsesJson });
      } catch (error) {
        console.log(error);
      }
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
            {data.map((project, index) => (
              <div
                key={project.id}
                label={project.title}
                projectId={project.id}
              >
                <Issues
                  key={project.id + "-" + index}
                  project={project.title}
                  projectId={project.id}
                />
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
