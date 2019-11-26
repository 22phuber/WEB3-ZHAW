import React, { useState } from "React";

/**
 * These loadingStates can and should be used to display dynamic icons to the user,
 * that resembles the current state. For example, loading could be used to show a spinning
 * Icon so the user sees that something is happening in the background.
 */
const loadingState = {
    waiting: 0,
    loading: 1,
    finished: 2,
    error: 4
}

/**
 * States for the single operations like:
 * get projects
 * post project
 * get issues
 * post issue
 */
const [projectGet, setProjectGetState] = useState(loadingState.waiting);
const [projectPost, setProjectPostState] = useState(loadingState.waiting);
const [issueGet, setIssueGetState] = useState(loadingState.waiting);
const [issuePost, setIssuePostState] = useState(loadingState.waiting);

/**
 * The UUID that resembles a client on the Heroku REST API.
 * 
 */
//TODO Replace with some kind of *.env variable
const client_uuid = "0772c89a-7790-4532-a700-b840ea69e31b";

const standardPayload = {
  project: {
    id: 0,
    created_at: null,
    updated_at: null,
    client_id: client_uuid,
    title: null,
    active: true
  },
  issue: {
    done: false,
    due_date: null,
    created_at: null,
    updated_at: null,
    title: null,
    project_client_id: client_uuid,
    priority: null,
    id: 0,
    client_id: client_uuid,
    project_id: 0
  }
}

// API related informations: Endpoint and JSON payload
const herokuApi = {
    projectsUrl: "http://zhaw-issue-tracker-api.herokuapp.com/api/projects",
    contentType: "application/json"
  };

/**
 * returns the current timestamp in the ISO format.
 */
function getCurrentTime() {
  return new Date().toISOString();
}

/**
 * Generates a random ID.
 */
function generateID() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

/**
 * Checks if the key returns any data. If not, you get an empty object.
 * @param {String} key They key value for the data in the local Storage
 */
function getLocalStorageData(key) {
  if(localStorage.getItem(key)
  && localStorage.getItem(key) != ""){
    return localStorage.getItem(key);
  } else {
    return [];
  }
}

async function getProjectIds(){

}




export default HerokuAPI;