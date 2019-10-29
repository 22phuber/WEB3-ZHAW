import React, { Component } from "react";
import Tabs from "../tabs/tabs.component";
import Issues from "../issues/issues.component";

import "./main.styles.css";

import { PROJECT_DATA, client_uuid, herokuApi } from "../../data/project.data";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
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

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <div className="Main">
          <Tabs>
            {data.map(project => (
              <div key={project.id} label={project.title}>
                <Issues project={project.title} projectId={project.id}/>
              </div>
            ))}
          </Tabs>
        </div>
      );
    } else {
      return (
        <div className="Main">
        </div>
      );
    }
  }
}

export default Main;
