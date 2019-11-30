import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../tabpanel/tabpanel.component";

import Issues from "../issues/issues.component";

const TabsPane = props => {
  const [currentTab, setCurrentTab] = useState(0);
  const [overflow, setOverflow] = useState(false);

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
  }));

  const handleChange = (event, newValue) => {
    props.onChangeCurrentTabId(newValue);
    setCurrentTab(newValue);
  };

  function willOverflow(amountOfTabs) {
    const { innerWidth: width } = window;
    setOverflow(width < amountOfTabs * 100);
  }

  useEffect(() => {
    willOverflow(props.data.length);
  },[props.data.length]);

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant={overflow ? "scrollable" : "fullWidth"}
          scrollButtons={overflow ? "auto" : "off"}
          indicatorColor= "primary"
          textColor= {props.darkMode ? "#4B4B4B" : "#757575"}
          centered={!overflow}
          aria-label="scrollable prevent tabs example"
        >
          {props.data.map((project, index) => (
            <Tab
              key={project.title + "_" + index}
              label={project.title}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {props.data.map((project, index) => (
        <TabPanel key={project.id} value={currentTab} index={index}>
          <Issues
            key={project.id + "_" + index}
            project={project.title}
            projectId={project.id}
          />
        </TabPanel>
      ))}
    </div>
  );
};

export default TabsPane;
