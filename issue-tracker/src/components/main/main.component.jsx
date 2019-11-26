import React, { Component } from "react";
import TabsPane from "../tabs/tabspane.component";
import Issues from "../issues/issues.component";
/* material-ui */
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./main.styles.css";

import { payloads, client_uuid, herokuApi } from "../../data/heroku.api";

const styles = {
  textField: {},
  button: {}
};

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
          <TabsPane data={
            {
              projects: [
                {id: 1,
                title: "test"},
                {id: 1,
                  title: "test"},
                  {id: 1,
                    title: "test"},
                    {id: 1,
                      title: "test"},
                      {id: 1,
                        title: "test"},
                        {id: 1,
                          title: "test"},
                          {id: 1,
                            title: "test"},
                            {id: 1,
                              title: "test"},
                              {id: 1,
                                title: "test"}
              ]
            }
          }
          />
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

export default withStyles(styles)(Main);
