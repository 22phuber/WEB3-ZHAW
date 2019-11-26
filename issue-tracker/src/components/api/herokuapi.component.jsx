import React, { useState } from "React";

const loadingState = {
    waiting: 0,
    loading: 1,
    finished: 2,
    error: 4
}

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
    projects: "http://zhaw-issue-tracker-api.herokuapp.com/api/projects",
    contentType: "application/json"
  };

const [projectGet, setProjectGetState] = useState(loadingState.waiting);
const [projectPush, setProjectPostState] = useState(loadingState.waiting);
const [issueGet, setIssueGetState] = useState(loadingState.waiting);
const [issuePost, setIssuePostState] = useState(loadingState.waiting);






export default HerokuAPI;