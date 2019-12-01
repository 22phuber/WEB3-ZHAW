import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Form from "../form/form.component";
import Input from "../input/input.component";

const styles = {
  projectTitleTextField: { width: "300px", "margin-top": "0px" },
  button: {},
};

function NewProjectDialog(props) {
  const { classes } = props;

  return (
    <>
      <Dialog
        open={props.open || false}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <Form
            newIssueData={props.onNewProjectCreated}
            children={
              <>
                <div>
                  <TextField
                    required
                    type={Input.types.title}
                    name="projectTitle"
                    id="projectTitle"
                    className={classes.projectTitleTextField}
                    label="Project Name"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <DialogActions>
                    <Button
                      onClick={props.handleClose}
                      color="primary"
                      size="medium"
                      type="button"
                      className={classes.button}
                    >
                      Cancel
                    </Button>
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
                  </DialogActions>
                </div>
              </>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(NewProjectDialog);
