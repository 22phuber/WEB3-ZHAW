import React, { useState } from "React";

const loadingState = {
    waiting: 0,
    loading: 1,
    finished: 2
}

const [projectGet, setProjectGetState] = useState(loadingState.waiting);
const [projectPush, setProjectPostState] = useState(loadingState.waiting);
const [issueGet, setIssueGetState] = useState(loadingState.waiting);
const [issuePost, setIssuePostState] = useState(loadingState.waiting);





export default HerokuAPI;