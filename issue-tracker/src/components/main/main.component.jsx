import React, { useState, useEffect } from "react";
import TabsPane from "../tabs/tabspane.component";
import Issues from "../issues/issues.component";
/* material-ui */
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./main.styles.css";

import * as HerokuAPI from "../api/heroku.api.js";
import Loading from "../loading/loading.component";

const styles = {
  textField: {},
  button: {}
};

const Main = props => {

  const [projectData, setProjectData] = useState(null);
  const [getProjectStatus, setGetProjectStatus] = useState(HerokuAPI.loadingState.waiting)

  function finishLoadingProjects(projectData) {
    setProjectData(projectData);
    setGetProjectStatus(HerokuAPI.loadingState.finished);
  }

  function submitNewProject(event){
    
    event.preventDefault();
    let jsonObject = {};
    for (const [key, value] of new FormData(event.target).entries()) {
      jsonObject[key] = value;
    }
    setGetProjectStatus(HerokuAPI.loadingState.loading);
    HerokuAPI.postNewProject(jsonObject.projectTitle, setProjectData);
  }

  useEffect(() => {
    if (!projectData) {
      setGetProjectStatus(HerokuAPI.loadingState.loading);
      HerokuAPI.fetchRemoteProjects(finishLoadingProjects);
    }
  });

  if (projectData) {
    return (
      <div className="Main">
        <TabsPane data={projectData} />
      </div>
    );

  } else if (getProjectStatus === HerokuAPI.loadingState.finished) {
    return (
      <div className="Main">
        <h2>Create your first Project</h2>
        <form onSubmit={submitNewProject}>
          <div>
            <div>
              <TextField
                type="text"
                required
                name="projectTitle"
                id="standard-basic"
                label="Project Name"
                margin="normal"
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                startIcon={<AddCircleOutlineIcon />}
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="Main">
        <Loading />
      </div>
    );
  }

}

/**
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
    

  handleSubmit = event => {
    event.preventDefault();
    let jsonObject = {};
    for (const [key, value] of new FormData(event.target).entries()) {
      jsonObject[key] = value;
    }
    this.createRemoteProject(jsonObject);
  };

  render() {
    const { data } = this.state;
    const { classes } = this.props;
    if (data) {
      return (
        <div className="Main">
          <TabsPane data={null}/>
        </div>
      );
    } else {
      return (
        <div className="Main">
          <h2>Create your first Project</h2>
          <form onSubmit={this.handleSubmit} method="POST">
            <div>
              <div>
                <TextField
                  type="text"
                  required
                  name="projectTitle"
                  id="standard-basic"
                  className={classes.textField}
                  label="Project Name"
                  margin="normal"
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                  className={classes.button}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

 */
export default Main;
