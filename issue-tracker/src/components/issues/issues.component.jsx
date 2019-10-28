import React from "react";
import Issue from "../issue/issue.component";

import "./issues.styles.css";

const Issues = ({ project, issues }) => (
  <div className="Issues">
    <h1>Issues</h1>
    <div>
      Issue count {issues.length || '0' } for {project}
    </div>
    <div>
      {issues.map(issue => (
        <Issue key={issue.id} issue={issue} />
      ))}
    </div>
  </div>
);

export default Issues;
