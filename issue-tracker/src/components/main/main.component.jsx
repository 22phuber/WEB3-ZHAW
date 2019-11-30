import React, { useState, useEffect } from "react";
import TabsPane from "../tabs/tabspane.component";
/* material-ui */
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import "./main.styles.css";

import * as HerokuAPI from "../api/heroku.api.js";
import Loading from "../loading/loading.component";


import { blue, red } from '@material-ui/core/colors';

const styles = {
  textField: {},
  button: {}
};

const Main = props => {

  const [projectData, setProjectData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [getProjectStatus, setGetProjectStatus] = useState(HerokuAPI.loadingState.waiting)
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  useEffect(() => {
    var primary = document.getElementsByClassName('MuiFab-primary');
    for (var i = 0; i < primary.length; i++) {
      primary[i].style.backgroundColor = props.darkMode ? "#494949" : "";
    }
    var elements = document.getElementsByClassName('MuiSpeedDialAction-fab');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = props.darkMode ? "#A4A4A4" : "white";
    }
    var labels = document.getElementsByClassName('MuiSpeedDialAction-staticTooltipLabel');
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.backgroundColor = props.darkMode ? "#A4A4A4" : "white";
      labels[i].style.color = props.darkMode ? "#4B4B4B" : "#757575";
    }
  });

  function setCurrentProjectTab(id) {
    setCurrentTab(id);
  }

  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  function deleteCurrentProject() {
    handleClose();
    HerokuAPI.deleteAllIssuesAndProjectId(currentTab);
  }

  function changeDarkMode() {
    handleClose();
    props.changeDarkMode();
  }

  useEffect(() => {
    if (!projectData) {
      setGetProjectStatus(HerokuAPI.loadingState.loading);
      HerokuAPI.fetchRemoteProjects(finishLoadingProjects);
    }
  }, [projectData]);

  const useStyles = makeStyles(theme => ({
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(props.mobileDevice ? 2 : 10),
      right: theme.spacing(2),
      'white-space': 'nowrap',
    },
  }));
  const classes = useStyles();

  if (projectData) {
    return (
      <div className="Main">
        <TabsPane data={projectData} onChangeCurrentTabId={setCurrentProjectTab} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            key={props.darkMode ? 'Light mode' : 'Dark mode'}
            icon={<Brightness4Icon />}
            tooltipTitle={props.darkMode ? 'Light mode' : 'Dark mode'}
            tooltipOpen={!props.mobileDevice}
            onClick={changeDarkMode}
          />
          <SpeedDialAction
            key={'New Project'}
            icon={<AddIcon />}
            tooltipTitle={'New Project'}
            tooltipOpen={!props.mobileDevice}
            onClick={handleClose}
          />
          <SpeedDialAction
            key={'Delete Project'}
            icon={<DeleteIcon />}
            tooltipTitle={'Delete Project'}
            tooltipOpen={!props.mobileDevice}
            onClick={deleteCurrentProject}
          />
          <SpeedDialAction
            key={'New Issue'}
            icon={<EditIcon />}
            tooltipTitle={'New Issue'}
            tooltipOpen={!props.mobileDevice}
            onClick={handleClose}
          />
        </SpeedDial>
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
export default Main;
