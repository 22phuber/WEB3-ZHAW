import React, { useState, useEffect } from "react";
import TabsPane from "../tabs/tabspane.component";
import CompleteSpeedDial from "../completeSpeedDial/completeSpeedDial.component";
/* material-ui */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./main.styles.css";

import * as HerokuAPI from "../api/heroku.api.js";
import Loading from "../loading/loading.component";

const Main = props => {
  const [projectData, setProjectData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [getProjectStatus, setGetProjectStatus] = useState(
    HerokuAPI.loadingState.waiting
  );

  useEffect(() => {
    if (!projectData) {
      setGetProjectStatus(HerokuAPI.loadingState.loading);
      HerokuAPI.fetchRemoteProjects(finishLoadingProjects);
    }
  }, [projectData]);

  function setCurrentProjectTab(id) {
    setCurrentTab(id);
  }

  function finishLoadingProjects(projectData) {
    setProjectData(projectData);
    setGetProjectStatus(HerokuAPI.loadingState.finished);
  }

  function submitNewProject(event) {
    event.preventDefault();
    let jsonObject = {};
    for (const [key, value] of new FormData(event.target).entries()) {
      jsonObject[key] = value;
    }
    setGetProjectStatus(HerokuAPI.loadingState.loading);
    HerokuAPI.postNewProject(jsonObject.projectTitle, setProjectData);
  }

  if (projectData) {
    return (
      <div className="Main">
        <TabsPane
          data={projectData}
          onChangeCurrentTabId={setCurrentProjectTab}
          darkMode={props.darkMode}
        />
        <CompleteSpeedDial
          mobileDevice={props.mobileDevice}
          darkMode={props.darkMode}
          changeDarkMode={props.changeDarkMode}
          currentTab={currentTab}
          finishLoadingProjects={finishLoadingProjects}
          setGetProjectStatus={setGetProjectStatus}
        />
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
};
export default Main;
