import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import * as HerokuAPI from "../api/heroku.api.js";

const CompleteSpeedDial = props => {


    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);


    useEffect(() => {
        Array.from(document.getElementsByClassName('MuiFab-primary'))
            .forEach((element) => {
                element.style.backgroundColor = props.darkMode ? "#494949" : "";
            });
        Array.from(document.getElementsByClassName('MuiSpeedDialAction-fab'))
            .forEach((element) => {
                element.style.backgroundColor = props.darkMode ? "#A4A4A4" : "white";
            });
        Array.from(document.getElementsByClassName('MuiSpeedDialAction-staticTooltipLabel'))
            .forEach((element) => {
                element.style.backgroundColor = props.darkMode ? "#A4A4A4" : "white";
                element.style.color = props.darkMode ? "#4B4B4B" : "#757575";
            });
    });


    function deleteCurrentProject() {
        handleClose();
        props.setGetProjectStatus(HerokuAPI.loadingState.loading);
        HerokuAPI.deleteAllIssuesAndProjectId(props.currentTab, props.finishLoadingProjects);
    }

    function changeDarkMode() {
        handleClose();
        props.changeDarkMode();
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
    const useStyles = makeStyles(theme => ({
        speedDial: {
            position: 'absolute',
            bottom: theme.spacing(props.mobileDevice ? 2 : 10),
            right: theme.spacing(2),
            'white-space': 'nowrap',
        },
    }));
    const classes = useStyles();

    if (props.mobileDevice) {
        return (
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
        );
    } else {
        return (
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
        );
    }
}

export default CompleteSpeedDial;