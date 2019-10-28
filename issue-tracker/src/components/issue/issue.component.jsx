import React from "react";

import "./issue.styles.css";

const Issue = ({ issue }) => {
  if (issue) {
    return (
      <div key={issue.id} className="Issue">
        <input type="checkbox" checked={issue.done} />
        <p>{issue.desc}</p>
      </div>
    );
  } else {
    return (<div className="Issue">No issue found</div>);
  }
};

export default Issue;
