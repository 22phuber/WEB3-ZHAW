import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Issues from "../issues/issues.component";
import * as HerokuAPI from "../api/heroku.api.js";
import Loading from "../loading/loading.component";

const TabsPane = props => {
  const [currentTab, setCurrentTab] = useState(0);
  const [overflow, setOverflow] = useState(false);

  const dateOptions = {
    timeZone: "Europe/Zurich",
    hour12: false,
  };
  // Crate date and 1 one day => Tomorrow
  var tmrw = new Date();
  tmrw.setDate(tmrw.getDate() + 1);
  // Create due date from Tomorrow
  var nowDueDate = new Date(tmrw)
    .toISOString()
    .toLocaleString("de-DE", dateOptions)
    .replace(/(.*):\d+\D\d+Z/, "$1");

  useEffect(() => {
    Array.from(document.getElementsByClassName('MuiAppBar-colorDefault'))
      .forEach((element) => {
        element.style.backgroundColor = props.darkMode ? "#cfcfcf" : "";
      });
  });

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: "100%"
    },
    titleTextField: { width: "300px" },
    textField: {},
    button: {},
    formControl: { width: "150px" },
  }));

  function handleChange(event, newValue) {
    props.onChangeCurrentTabId(newValue);
    setCurrentTab(newValue);
  };

  function willOverflow(amountOfTabs) {
    const { innerWidth: width } = window;
    setOverflow(width < (amountOfTabs * 180));
  }

  useEffect(() => {
    willOverflow(props.projectData.length);
    if (props.projectData.length < currentTab) {
      handleChange(null, 0);
    } else if (props.projectData.length > currentTab) {
      if (!props.firstLoad) {
        handleChange(null, props.projectData.length - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.projectData.length]);

  function handleSubmit(event) {
    event.preventDefault();
    let jsonObject = {};
    for (const [key, value] of new FormData(event.target).entries()) {
      jsonObject[key] = value;
    }
    HerokuAPI.postNewIssue(props.projectData[currentTab].id,
      jsonObject.issueTitle,
      jsonObject.dueDate,
      jsonObject.issuePriority,
      props.startLoadingIssues);
  };

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }

  const classes = useStyles();
  if (props.issueData && props.getIssueStatus === HerokuAPI.loadingState.finished) {
    if (props.issueData.length === 0) {
      return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={currentTab}
              onChange={handleChange}
              variant={overflow ? "scrollable" : "fullWidth"}
              scrollButtons={overflow ? "auto" : "off"}
              indicatorColor="primary"
              color={props.darkMode ? "#4B4B4B" : "#757575"}
              centered={!overflow}
              aria-label="scrollable prevent tabs example"
            >
              {props.projectData.map((project, index) => (
                <Tab
                  key={project.title + "_" + index}
                  label={project.title}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </AppBar>
          <div>
          <h2>Create your first Issue</h2>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="IssueForm"
          >
            <div>
              <TextField
                required
                type="text"
                name="issueTitle"
                id="standard-basic"
                className={classes.titleTextField}
                label="Issue Name"
                margin="normal"
              />
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="priority-native-simple">
                  Priority
                </InputLabel>
                <Select
                  required
                  native
                  value={3}
                  inputProps={{
                    name: "issuePriority",
                    id: "priority-native-simple",
                  }}
                >
                  <option value={3}>Low</option>
                  <option value={2}>Middle</option>
                  <option value={1}>High</option>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                required
                name="dueDate"
                id="datetime-local"
                label="Due date"
                type="datetime-local"
                defaultValue={nowDueDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
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
          </form>
        </div>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={currentTab}
              onChange={handleChange}
              variant={overflow ? "scrollable" : "fullWidth"}
              scrollButtons={overflow ? "auto" : "off"}
              indicatorColor="primary"
              color={props.darkMode ? "#4B4B4B" : "#757575"}
              centered={!overflow}
              aria-label="scrollable prevent tabs example"
            >
              {props.projectData.map((project, index) => (
                <Tab
                  key={project.title + "_" + index}
                  label={project.title}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </AppBar>
          <Issues
            issueData={props.issueData}
            projectId={props.projectData[currentTab].id}
            setGetIssuesStatus={props.setGetIssuesStatus}
            startLoadingIssues={props.startLoadingIssues}
          />
        </div>
      );
    }
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={currentTab}
            onChange={handleChange}
            variant={overflow ? "scrollable" : "fullWidth"}
            scrollButtons={overflow ? "auto" : "off"}
            indicatorColor="primary"
            color={props.darkMode ? "#4B4B4B" : "#757575"}
            centered={!overflow}
            aria-label="scrollable prevent tabs example"
          >
            {props.projectData.map((project, index) => (
              <Tab
                key={project.title + "_" + index}
                label={project.title}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppBar>
        <Loading text={"Fetching issue data..."} />
      </div>
    );
  }
};

export default TabsPane;
