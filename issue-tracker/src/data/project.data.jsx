// current Timestamp
var now = new Date();
const currentISOTimeStamp = now.toISOString();
// due dates
var dueDate = new Date();
dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 21) );
const dueDateISOTimeStamp = dueDate.toISOString();

// UUID for API client_id
const client_uuid = "0772c89a-7790-4532-a700-b840ea69e31b";

// API related informations: Endpoint and JSON payload
const herokuApi = {
  projects: "http://zhaw-issue-tracker-api.herokuapp.com/api/projects",
  contentType: "application/json",
  project_payload: [
    {
      id: 0,
      created_at: currentISOTimeStamp,
      updated_at: currentISOTimeStamp,
      client_id: client_uuid,
      title: null,
      active: true
    },
    {
      id: 0,
      created_at: currentISOTimeStamp,
      updated_at: currentISOTimeStamp,
      client_id: client_uuid,
      title: null,
      active: true
    }
  ],
  issue_payload: [
    {
        "done": false,
        "due_date": dueDateISOTimeStamp,
        "created_at": currentISOTimeStamp,
        "updated_at": currentISOTimeStamp,
        "title": null,
        "project_client_id": client_uuid,
        "priority": null,
        "id": 0,
        "client_id": client_uuid,
        "project_id": 0
      },
      {
        "done": false,
        "due_date": dueDateISOTimeStamp,
        "created_at": currentISOTimeStamp,
        "updated_at": currentISOTimeStamp,
        "title": null,
        "project_client_id": client_uuid,
        "priority": null,
        "id": 0,
        "client_id": client_uuid,
        "project_id": 0
      },
      {
        "done": true,
        "due_date": dueDateISOTimeStamp,
        "created_at": currentISOTimeStamp,
        "updated_at": currentISOTimeStamp,
        "title": null,
        "project_client_id": client_uuid,
        "priority": null,
        "id": 0,
        "client_id": client_uuid,
        "project_id": 0
      }
  ]
};

/* FUNTCIONS */
var generateID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

async function initializeIssueTrackerData() {
  herokuApi.project_payload.forEach(async payload => {
    try {
      const response = await fetch(herokuApi.projects, {
        method: "POST",
        headers: {
          Accept: herokuApi.contentType,
          "Content-Type": herokuApi.contentType
        },
        body: JSON.stringify({
          ...payload,
          title: "Project-" + generateID()
        })
      });
      const responseJson = await response.json();

      //console.log(responseJson);
      localStorage.setItem(
        client_uuid,
        (localStorage.getItem(client_uuid) || "") +
          JSON.stringify(responseJson.id) +
          ","
      );

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  });
}

function validateLocalStorage(localStorageKey) {
  if (
    localStorage.getItem(localStorageKey) &&
    localStorage.getItem(localStorageKey) !== ""
  ) {
    console.log("localStorage data found.");
  } else {
    initializeIssueTrackerData();
  }
}

/* MAIN */
validateLocalStorage(client_uuid);

const PROJECT_DATA = [
  {
    id: 1,
    title: "project1",
    issues: [
      {
        id: 1,
        desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
        dueDate: "31.10.2019",
        priority: 1,
        done: false
      },
      {
        id: 2,
        desc: "eirmod tempor invidunt ut labore et dolore magna",
        dueDate: "05.11.2019",
        priority: 2,
        done: false
      }
    ]
  },
  {
    id: 2,
    title: "project2",
    issues: [
      {
        id: 1,
        desc: "Lorem ipsum dolor sit amet, sed.",
        dueDate: "05.11.2019",
        priority: 2,
        done: false
      },
      {
        id: 2,
        desc: "Do this and that, fix it asap!",
        dueDate: "24.12.2019",
        priority: 3,
        done: false
      },
      {
        id: 3,
        desc: "This is already done!",
        dueDate: "10.10.2019",
        priority: 2,
        done: true
      }
    ]
  }
];

export {
    PROJECT_DATA,
    client_uuid,
    herokuApi
};
