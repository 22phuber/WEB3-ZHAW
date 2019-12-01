import React, { useState, useEffect } from "react";
import TabsPane from "../tabs/tabspane.component";
import CompleteSpeedDial from "../completeSpeedDial/completeSpeedDial.component";
import IssueDialog from "../dialogs/newIssueDialog.component";
import ProjectDialog from "../dialogs/newProjectDialog.component";

/* material-ui */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./main.styles.css";

import * as HerokuAPI from "../api/heroku.api.js";
import Loading from "../loading/loading.component";

const Main = props => {
  const [projectData, setProjectData] = useState(null);
  const [issueData, setIssueData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  const [getProjectStatus, setGetProjectStatus] = useState(
    HerokuAPI.loadingState.waiting
  );
  const [getIssueStatus, setGetIssuesStatus] = useState(
    HerokuAPI.loadingState.waiting
  );

  useEffect(() => {
    if (!projectData) {
      setGetProjectStatus(HerokuAPI.loadingState.loading);
      HerokuAPI.fetchRemoteProjects(finishLoadingProjects);
    } else {
      startLoadingIssues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData]);

  useEffect(() => {
    startLoadingIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentTab])

  function setCurrentProjectTab(id) {
    setCurrentTab(id);
  }

  function onProjectDelete() {
    setFirstLoad(true);
    setCurrentTab(0);
  }

  function createProject(projectTitle) {
    setOpenProjectDialog(false);
    setGetProjectStatus(HerokuAPI.loadingState.loading);
    HerokuAPI.postNewProject(projectTitle, finishLoadingProjects);
  }

  function createIssue(issueData) {
    setOpenIssueDialog(false);
    setGetIssuesStatus(HerokuAPI.loadingState.loading);
    HerokuAPI.postNewIssue(
      projectData[currentTab].id,
      issueData.issueTitle,
      issueData.dueDate,
      issueData.issuePriority,
      startLoadingIssues
    );
  }

  function showIssueDialog() {
    setOpenIssueDialog(true);
  }

  function hideIssueDialog() {
    setOpenIssueDialog(false);
  };

  function showProjectDialog() {
    setOpenProjectDialog(true);
  }

  function hideProjectDialog() {
    setOpenProjectDialog(false);
  };

  function finishLoadingIssues(issueData) {
    setIssueData(issueData);
    setGetIssuesStatus(HerokuAPI.loadingState.finished);
  }

  function finishLoadingProjects(projectData) {
    setGetProjectStatus(HerokuAPI.loadingState.finished);
    setProjectData(projectData);
    setFirstLoad(false);
  }

  function startLoadingIssues() {
    if (projectData && projectData[currentTab]) {
      setGetIssuesStatus(HerokuAPI.loadingState.loading)
      HerokuAPI.getProjectIssues(projectData[currentTab].id, finishLoadingIssues)
    }
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

  if (projectData && getProjectStatus === HerokuAPI.loadingState.finished) {
    return (
      <div className="Main">
        <IssueDialog
          open={openIssueDialog}
          title={"Create new Issue"}
          handleClose={hideIssueDialog}
          onNewIssueCreated={formData => createIssue(formData)}
        />
        <ProjectDialog
          open={openProjectDialog}
          title={"Create new Project"}
          handleClose={hideProjectDialog}
          onNewProjectCreated={formData => createProject(formData.projectTitle)}
        />
        <TabsPane
          projectData={projectData}
          issueData={issueData}
          onChangeCurrentTabId={setCurrentProjectTab}
          darkMode={props.darkMode}
          firstLoad={firstLoad}
          getIssueStatus={getIssueStatus}
          createIssue={createIssue}
          setGetIssuesStatus={setGetIssuesStatus}
          startLoadingIssues={startLoadingIssues}
        />
        <CompleteSpeedDial
          mobileDevice={props.mobileDevice}
          darkMode={props.darkMode}
          changeDarkMode={props.changeDarkMode}
          onProjectDelete={onProjectDelete}
          currentTab={currentTab}
          finishLoadingProjects={finishLoadingProjects}
          setGetProjectStatus={setGetProjectStatus}
          handleOpenIssueDialog={showIssueDialog}
          handleOpenProjectDialog={showProjectDialog}
        />
      </div>
    );
  } else if (getProjectStatus === HerokuAPI.loadingState.finished) {
    return (
      <div className="Main">
        <h2>Create your first Project</h2>
        <form onSubmit={submitNewProject}>
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
        </form>
      </div>
    );
  } else {
    return (
      <div className="Main">
        <Loading text={"Fetching projects data..."} />
      </div>
    );
  }
};
export default Main;
