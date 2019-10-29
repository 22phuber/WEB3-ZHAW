#!/usr/bin/env bash
set -e

# Project to create issues
declare -a projects=("19506" "19507")
apiUrl="http://zhaw-issue-tracker-api.herokuapp.com/api/projects"
contentType="application/json"
now=$(date -j "+%Y-%m-%dT%H:%M:%SZ")
dueDate=$(date -j -v +5d "+%Y-%m-%dT%H:%M:%SZ")
client_uuid="0772c89a-7790-4532-a700-b840ea69e31b"

for project in "${projects[@]}"; do
    if ( ((RANDOM%2)) ); then
        done="true"
    else
        done="false"
    fi
    issue_payload="{
        \"done\": ${done},
        \"due_date\": \"${now}\",
        \"title\": \"Issue-$(uuidgen)\",
        \"updated_at\": \"${now}\",
        \"project_client_id\": \"${client_uuid}\",
        \"priority\": \"$((RANDOM%3+1))\",
        \"id\": 0,
        \"client_id\": \"${client_uuid}\",
        \"project_id\": ${project},
        \"created_at\": \"${dueDate}\"
    }"
    apiIssueUrl="${apiUrl}/${project}/issues"
    echo curl -v -X POST --header "Content-Type: ${contentType}" \
         --header "Accept: ${contentType}" -d "${issue_payload}" "${apiIssueUrl}"
    curl -X POST --header "Content-Type: ${contentType}" -w "\nResponse: %{http_code}\n"\
         --header "Accept: ${contentType}" -d "${issue_payload}" "${apiIssueUrl}"
done

exit 0