import React, { useState } from "react";
import Button from '../button/button.component';
import Input from '../input/input.component';

import './issue.styles.css';

const Issue = ({ issue }) => (
      <div key={ issue.id } className="Issue">
        <input type="checkbox" checked={issue.done} />
        <p>{ issue.desc }</p>
      </div>
)
  
export default Issue;