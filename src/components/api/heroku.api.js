/**
 * These loadingStates can and should be used to display dynamic icons to the user,
 * that resembles the current state. For example, loading could be used to show a spinning
 * Icon so the user sees that something is happening in the background.
 */
export const loadingState = {
  waiting: 0,
  loading: 1,
  finished: 2,
  error: 4,
};

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
    active: true,
  },
  issue: {
    done: false,
    due_date: null,
    updated_at: null,
    title: null,
    project_client_id: client_uuid,
    priority: null,
    id: 0,
    client_id: client_uuid,
    project_id: 0,
  },
};

// API related informations: Endpoint and JSON payload
const herokuApi = {
  projectsUrl: "https://zhaw-issue-tracker-api.herokuapp.com/api/projects",
  contentType: "application/json",
};

/**
 * returns the current timestamp in the ISO format.
 */
function getCurrentTime() {
  return new Date().toISOString();
}

/**
 * Checks if the key returns any data. If not, you get an object with
 * and empty projectIds array.
 * @param {String} key They key value for the data in the local Storage
 */
function getLocalStorageData(key) {
  if (localStorage.getItem(key) && localStorage.getItem(key) !== "") {
    return localStorage.getItem(key);
  } else {
    return null;
  }
}

/**
 * Due to the fact that the Heroku API does not offer any form of fetching
 * projects based on UUID, we have to locally save the project IDs to be
 * able to fetch them at a later date.
 * @param {int} id
 * @param {String} title
 */
function saveProjectIdToLocalStorage(id, projectTitle) {
  var projectData = JSON.parse(getLocalStorageData(client_uuid));
  if (!projectData) {
    projectData = {
      projects: [],
    };
  }
  projectData.projects.push({
    title: projectTitle,
    id: id,
  });
  writeProjectDataToLocalStorage(projectData);
}

/**
 * Updates entry in the local storage according to the id.
 * 
 * @param {int} id 
 * @param {String} title 
 *
function changeProjectDataInLocalStorage(id, title) {
  var projectData = getLocalStorageData(client_uuid);
  projectData.projects.forEach(project => {
    if (project.id === id) {
      project.title = title;
    }
  });
  writeProjectDataToLocalStorage(projectData);
}
*/

/**
 * Removes a project from the local Storage. Only call this
 * if the project was also removed from the heroku service,
 * as you won't be able to access it anymore!
 * @param {int} id
 */
function removeProjectIdFromLocalStorage(id) {
  var projectData = JSON.parse(getLocalStorageData(client_uuid));
  projectData.projects = projectData.projects.filter(
    project => project.id !== id
  );
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
export async function postNewProject(projectTitle, callback) {
  fetch(herokuApi.projectsUrl, {
    method: "POST",
    headers: {
      Accept: herokuApi.contentType,
      "Content-Type": herokuApi.contentType,
    },
    body: JSON.stringify({
      ...standardPayload.project,
      title: projectTitle,
      created_at: getCurrentTime(),
      updated_at: getCurrentTime(),
    }),
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      saveProjectIdToLocalStorage(data.id, projectTitle);
      if (callback) {
        callback();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function getProjectIdFromTabsId(id) {
  return JSON.parse(getLocalStorageData(client_uuid)).projects[id].id;
}

/**
 * This function uses a PUT request to change the project data
 * on the heroku API
 * @param {int} id 
 * @param {String} title 
 * @param {boolean} active 
 *
async function putProject(id, title, active) {
  fetch(herokuApi.projectsUrl.concat("/", id),
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
      res.json();
    })
    .then(data => {
      changeProjectDataInLocalStorage(id, title);
    })
    .catch(error => {
      console.log(error);
    })
}
*/

/*
async function getProject(id) {
  fetch(herokuApi.projectsUrl.concat("/", id))
    .then(res => {
      res.json();
    })
    .then(data => {
    })
    .catch(error => {
      console.log(error);
    })
}
*/

async function deleteProject(id) {
  return fetch(herokuApi.projectsUrl.concat("/", id), {
    method: "DELETE",
    headers: {
      Accept: herokuApi.contentType,
      "Content-Type": herokuApi.contentType,
    },
  }).catch(error => {
    console.log(error);
  });
}

export async function fetchRemoteProjects(callback) {
  const localData = JSON.parse(getLocalStorageData(client_uuid));
  if (localData && localData.projects.length > 0) {
    try {
      const responses = await Promise.all(
        localData.projects.map(
          async project => await fetch(herokuApi.projectsUrl + "/" + project.id)
        )
      );
      const responsesJson = await Promise.all(
        responses.map(async response => await response.json())
      );
      callback(responsesJson);
    } catch (error) {
      callback(null);
      console.log(error);
    }
  } else {
    callback(null);
  }
}

/**
 * Gets all issues stored on the given project id
 * in the heroku service
 * @param {int} id 
 */
export async function getProjectIssues(id, callback) {
  await fetch(herokuApi.projectsUrl.concat("/", id, "/issues"))
    .then(res => res.json())
    .then(data => {
      if (callback) {
        callback(data);
      }
    })
    .catch(error => {
      console.log(error);
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
export async function postNewIssue(projectId, issueTitle, dueDate,
  priority, callback) {
  // current
  const now = getCurrentTime();
  var due = new Date(dueDate + ":00");
  const dueISOTimeStamp = due.toISOString();

  fetch(herokuApi.projectsUrl.concat("/", projectId, "/issues"),
    {
      method: "POST",
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType,
      },
      body: JSON.stringify({
        ...standardPayload.issue,
        title: issueTitle,
        due_date: dueISOTimeStamp,
        created_at: now,
        updated_at: now,
        priority: priority,
      }),
    }
  ).then(res => res.json())
    .then(data => {
      if (callback) { callback() };
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
export async function putIssue(projectId, issueId, issueTitle, dueDate, priority, isDone) {
  const updatedAt = getCurrentTime();
  fetch(herokuApi.projectsUrl.concat("/", projectId, "/issues/", issueId),
    {
      method: 'PUT',
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType
      },
      body: JSON.stringify({
        ...standardPayload.issue,
        done: isDone,
        title: issueTitle,
        due_date: dueDate,
        updated_at: updatedAt,
        priority: priority
      }),
    })
    .then(res => {
      res.json();
    })
    .then(data => {
    })
    .catch(error => {
      console.log(error);
    })
}

export async function deleteAllIssuesAndProjectId(tabsId, callback) {
  const projectId = getProjectIdFromTabsId(tabsId);
  const issues = await fetch(
    herokuApi.projectsUrl.concat("/", projectId, "/issues")
  ).then(res => res.json());
  await Promise.all(
    issues.map(async issue => await deleteIssue(projectId, issue.id))
  );
  deleteProject(projectId);
  removeProjectIdFromLocalStorage(projectId);
  fetchRemoteProjects(callback);
}

/**
 * Deletes an issue in the heroku service
 * @param {int} projectId
 * @param {int} issueId
 */
export function deleteIssue(projectId, issueId, callback) {
  return fetch(
    herokuApi.projectsUrl.concat("/", projectId, "/issues/", issueId),
    {
      method: "DELETE",
      headers: {
        Accept: herokuApi.contentType,
        "Content-Type": herokuApi.contentType,
      },
    }
  )
    .then(res => {
      res.json();
    }).then(data => {
      if (callback) {
        callback();
      }
    })
    .catch(error => {
      console.log(error);
    });
}