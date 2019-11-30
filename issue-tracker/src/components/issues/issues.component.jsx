import React, { Component } from "react";
/* material-ui */
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Issue from "../issue/issue.component";
import Loading from "../loading/loading.component";
import IssueDialog from "../dialogs/newIssueDialog.component";
import "./issues.styles.css";

import { payloads, client_uuid, herokuApi } from "../../data/heroku.api";

const styles = {
  titleTextField: { width: "300px" },
  textField: {},
  button: {},
  formControl: { width: "150px" },
};

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectid: this.props.projectId,
      showPopup: false,
    };
    this.fetchRemoteIssues = this.fetchRemoteIssues.bind(this);
    this.createRemoteIssue = this.createRemoteIssue.bind(this);
    this.updateRemoteIssue = this.updateRemoteIssue.bind(this);
    this.deleteRemoteIssue = this.deleteRemoteIssue.bind(this);
  }

  // Dialog
  setDialogState = open => {
    this.setState({
      showDialog: open,
    });
  };

  handleClickOpen = () => {
    this.setDialogState(true);
  };

  handleClose = () => {
    this.setDialogState(false);
  };
  // End Dialog
  
  createdNewIssue = data => {
    this.setDialogState(false);
    //this.setPopupState(false);
    this.createRemoteIssue(data);
    this.fetchRemoteIssues();
  };

  async createRemoteIssue(issueData) {
    // current
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();
    // due date
    var due = new Date(issueData.dueDate + ":00");
    const dueISOTimeStamp = due.toISOString();

    try {
      const response = await fetch(
        herokuApi.projects + "/" + this.state.projectid + "/issues",
        {
          method: "POST",
          headers: {
            Accept: herokuApi.contentType,
            "Content-Type": herokuApi.contentType,
          },
          body: JSON.stringify({
            ...payloads.issue,
            title: issueData.issueTitle,
            due_date: dueISOTimeStamp,
            created_at: currentISOTimeStamp,
            updated_at: currentISOTimeStamp,
            priority: issueData.issuePriority,
          }),
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.fetchRemoteIssues();
    } catch (error) {
      console.log(error);
    }
  }

  async fetchRemoteIssues() {
    if (
      localStorage.getItem(client_uuid) &&
      localStorage.getItem(client_uuid) !== ""
    ) {
      try {
        const response = await fetch(
          herokuApi.projects + "/" + this.state.projectid + "/issues",
          {
            method: "GET",
            headers: {
              Accept: herokuApi.contentType,
              "Content-Type": herokuApi.contentType,
            },
          }
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const responseJson = await response.json();
        this.setState({ issues: responseJson });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateRemoteIssue(issueData) {
    var now = new Date();
    const currentISOTimeStamp = now.toISOString();

    try {
      const response = await fetch(
        herokuApi.projects +
          "/" +
          issueData.project_id +
          "/issues/" +
          issueData.id,
        {
          method: "PUT",
          headers: {
            Accept: herokuApi.contentType,
            "Content-Type": herokuApi.contentType,
          },
          body: JSON.stringify({
            ...issueData,
            done: issueData.done,
            title: issueData.title,
            due_date: issueData.due_date,
            created_at: issueData.created_at,
            updated_at: currentISOTimeStamp,
            priority: issueData.priority,
          }),
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.fetchRemoteIssues();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRemoteIssue(issueData) {
    try {
      const response = await fetch(
        herokuApi.projects +
          "/" +
          issueData.project_id +
          "/issues/" +
          issueData.id,
        {
          method: "DELETE",
          headers: {
            Accept: herokuApi.contentType,
            "Content-Type": herokuApi.contentType,
          },
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.fetchRemoteIssues();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.fetchRemoteIssues();
  }

  handleChange = name => event => {
    console.log([name] + ": " + event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    let jsonObject = {};
    for (const [key, value] of new FormData(event.target).entries()) {
      jsonObject[key] = value;
    }
    this.createRemoteIssue(jsonObject);
  };

  render() {
    const { issues = this.state.issues } = this;
    const { classes } = this.props;
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

    if (issues && issues.length > 0) {
      return (
        <>
          <IssueDialog
            open={this.state.showDialog}
            title={"Create new Issue"}
            handleClose={() => this.handleClose()}
            onNewIssueCreated={this.createdNewIssue}
          />
          <div className="Issues">
            <div className="issues-header">
              <h1>Issues [{issues.length || "0"}]</h1>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
                // onClick={() => this.setPopupState(true)}
                onClick={() => this.handleClickOpen()}
              >
                Create Issue
              </Button>
            </div>
            <div>
              <div className="issues-heading-table">
                <div className="issues-heading-done">Done</div>
                <div className="issues-heading-desc">Description</div>
                <div className="issues-heading-prio">Prio</div>
                <div className="issues-heading-due">Due date</div>
                <div className="issues-heading-delete">Delete</div>
              </div>
              <div className="issue-list">
                {issues.map(issue => (
                  <Issue
                    updateRemoteIssue={this.updateRemoteIssue}
                    deleteRemoteIssue={this.deleteRemoteIssue}
                    key={issue.id}
                    issue={issue}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      );
    } else if (issues && issues.length === 0) {
      return (
        <div>
          <h2>Create your first Issue</h2>
          <form
            onSubmit={this.handleSubmit}
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
                  value={issues.priority}
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
      );
    } else {
      return <Loading />;
    }
  }
}

export default withStyles(styles)(Issues);
