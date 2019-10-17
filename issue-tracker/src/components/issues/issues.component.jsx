import React from "react";
import Issue from '../issue/issue.component';

import './issues.styles.css';

const Issues = ({ project, issues }) => (
  <div className="Issues">
    <h1>Issues</h1>
    <div>Issue count { issues.length } for { project }</div>
    <div>
      {
        issues.map( (issue) => ( 
          <Issue issue={ issue } />
        ) )
       }
    </div>
  </div>
)
  
export default Issues;