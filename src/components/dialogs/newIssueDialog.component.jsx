import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Form from "../form/form.component";
import Input from "../input/input.component";

const styles = {
  titleTextField: { width: "300px", 'margin-top': '0px' },
  textField: {},
  button: {},
  formControl: { width: "150px" },
};

function NewIssueDialog(props) {
  const { classes } = props;
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
            newIssueData={props.onNewIssueCreated}
            children={
              <>
                <div>
                  <TextField
                    required
                    type={Input.types.title}
                    name="issueTitle"
                    id="issueTitle"
                    className={classes.titleTextField}
                    label="Issue Name"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="issuePriority-native-simple">
                      Priority
                    </InputLabel>
                    <Select
                      required
                      native
                      value={3}
                      inputProps={{
                        name: "issuePriority",
                        id: "issuePriority-native-simple",
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

export default withStyles(styles)(NewIssueDialog);
