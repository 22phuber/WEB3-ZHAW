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
 * get project
 * put project
 * post project
 * delete project
 * get issue
 * put issue
 * post issue
 * delete issue
 */
const [projectGet, setProjectGetState] = useState(loadingState.waiting);
const [projectPut, setProjectPutState] = useState(loadingState.waiting);
const [projectPost, setProjectPostState] = useState(loadingState.waiting);
const [projectDelete, setProjectDeleteState] = useState(loadingState.waiting);

const[issuesGet, setIssuesGetState] = useState(loadingState.waiting);

const [issuePut, setIssuePutState] = useState(loadingState.waiting);
const [issuePost, setIssuePostState] = useState(loadingState.waiting);
const [issueDelete, setIssueDeleteState] = useState(loadingState.waiting);



/**
 * The UUID that resembles a client on the Heroku REST API.
 * 
 */
//TODO Replace with some kind of *.env variable
const client_uuid = "0772c89a-7790-4532-a700-b840ea69e31b";

const standardPayload = {
  project: {
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
 * Checks if the key returns any data. If not, you get an object with
 * and empty projectIds array.
 * @param {String} key They key value for the data in the local Storage
 */
function getLocalStorageData(key) {
  if (localStorage.getItem(key)
    && localStorage.getItem(key) != "") {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return {
      projects: [

      ]
    };
  }
}

/**
 * Due to the fact that the Heroku API does not offer any form of fetching 
 * projects based on UUID, we have to locally save the project IDs to be 
 * able to fetch them at a later date.
 * @param {int} id 
 * @param {String} title 
 */
function saveProjectIdToLocalStorage(id, title) {
  var projectData = getLocalStorageData(client_uuid);
  projectData.projects.push(JSON.parse(
    {
      title: title,
      id: id
    }
  ));
  writeProjectDataToLocalStorage(projectData);
}

/**
 * Updates entry in the local storage according to the id.
 * 
 * @param {int} id 
 * @param {String} title 
 */
function changProjectDataInLocalStorage(id, title) {
  var projectData = getLocalStorageData(clien_uuid);
  projectData.projects.forEach(project => {
    if (project.id == id) {
      project.title = title;
    }
  });
  writeProjectDataToLocalStorage(projectData);
}

/**
 * Removes a project from the local Storage. Only call this
 * if the project was also removed from the heroku service,
 * as you won't be able to access it anymore!
 * @param {int} id 
 */
function removeProjectIdFromLocalStorage(id) {
  var projectData = getLocalStorageData(client_uuid);
  projectData.projects = projectData.projects
    .filter(project => project.id = id);
  writeProjectDataToLocalStorage(projectData);
}

function writeProjectDataToLocalStorage(projectData) {
  localStorage.setItem(client_uuid, JSON.stringify(projectData));
}

/**
 * To enable the creation of new projects in the api,
 * we use this function to post a new issue with id 0.
 * the response then contains an id that was generated by the 
 * REST API, which is then saved to the localStorage.
 * When this function set projectPost to waiting, it means the new ids
 * were saved to the localStorage and can be pulled again.
 * 
 */
async function postNewProject(title) {
  setProjectPostState(loadingState.loading);
  fetch(herokuApi.projectsUrl,
    {
      method: 'POST',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: {
        ...standardPayload.project,
        title: title
      }
    })
    .then(res => {
      setProjectPostState(loadingState.done)
      res.json();
    })
    .then(data => {
      saveProjectIdToLocalStorage(data.id, title);
      setProjectPostState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setProjectPostState(loadingState.error);
    })
}

/**
 * Deletes a project on the heroku service
 * and removes it from the localStorage
 */
async function deleteProject(id) {
  setProjectDeleteState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", id),
    {
      method: 'DELETE',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      }
    })
    .then(res => {
      setProjectDeleteState(loadingState.done)
    })
    .then(data => {
      setProjectDeleteState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setProjectDeleteState(loadingState.error);
    })
}

/**
 * This function uses a PUT request to change the project data
 * on the heroku API
 * @param {int} id 
 * @param {String} title 
 * @param {boolean} active 
 */
async function putProject(id, title, active) {
  setProjectPutState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", id),
    {
      method: 'PUT',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: {
        ...standardPayload.project,
        title: title,
        active: active
      }
    })
    .then(res => {
      setProjectPutState(loadingState.done)
      res.json();
    })
    .then(data => {
      changProjectDataInLocalStorage(id, title);
      setProjectPutState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setProjectPutState(loadingState.error);
    })
}

async function getProject(id){
  setProjectGetState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", id))
    .then(res => {
      setProjectGetState(loadingState.done)
      res.json();
    })
    .then(data => {
      setProjectGetState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setProjectGetState(loadingState.error);
    })
}

/**
 * Gets all issues stored on the given project id
 * in the heroku service
 * @param {int} id 
 */
async function getProjectIssues(id){
  setIssuesGetState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", id, "/issues"))
    .then(res => {
      setIssuesGetState(loadingState.done)
      res.json();
    })
    .then(data => {
      setIssuesGetState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setIssuesGetState(loadingState.error);
    })
}

/**
 * Function to post a new issue to a certain projectId on
 * the heroku API service
 * @param {int} projectId
 * @param {String} issueTitle
 * @param {String} dueDate
 * @param {String} priority
 * @param {boolean} done
 */
async function postNewIssue(projectId, issueTitle, dueDate, priority){
  setIssuePostState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", projectId, "/issues"),
    {
      method: 'POST',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: {
        ...standardPayload.issue,
        done: false,
        title: issueTitle,
        due_date: dueDate,
        priority: priority
      }
    })
    .then(res => {
      setIssuePostState(loadingState.done)
      res.json();
    })
    .then(data => {
      setIssuePostState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setIssuePostState(loadingState.error);
    })
}

/**
 * Function to update an issue
 * the heroku API service
 * @param {int} projectId
 * @param {int} issueId
 * @param {String} issueTitle
 * @param {String} dueDate
 * @param {String} priority
 * @param {boolean} done
 */
async function putIssue(projectId, issueId, issueTitle, dueDate, priority, done){
  setIssuePutState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", projectId, "/issues/", issueId),
    {
      method: 'PUT',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: {
        ...standardPayload.issue,
        done: done,
        title: issueTitle,
        due_date: dueDate,
        priority: priority
      }
    })
    .then(res => {
      setIssuePutState(loadingState.done)
      res.json();
    })
    .then(data => {
      setIssuePutState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setIssuePutState(loadingState.error);
    })
}

/**
 * Deletes an issue in the heroku service
 * @param {int} projectId 
 * @param {int} issueId 
 */
async function deleteIssue(projectId, issueId){
  setIssueDeleteState(loadingState.loading);
  fetch(str.concat(herokuApi.projectsUrl, "/", projectId, "/issues/", issueId),
    {
      method: 'DELETE',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      }
    })
    .then(res => {
      setIssueDeleteState(loadingState.done)
      res.json();
    })
    .then(data => {
      setIssueDeleteState(loadingState.waiting);
    })
    .catch(error => {
      console.log(error);
      setIssueDeleteState(loadingState.error);
    })
}






export default HerokuAPI;