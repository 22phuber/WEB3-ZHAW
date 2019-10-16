import React, { Component } from "react";
import Tabs from '../tabs/tabs.component';
import Issues from '../issues/issues.component';

import './main.styles.css';

import PROJECT_DATA from '../../data/project.data';

class Main extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        data: PROJECT_DATA
      }
    }

    render() {
      const { data } = this.state;
      return (
        <div className="Main">
          <Tabs>
          {
            data.map( (project) => (
              <div key={ project.id } label={ project.title }>
                <Issues project={ project.title } issues={project.issues} />
              </div>
            ) )
          }
          </Tabs>
        </div>
      );
    }
}
  
  export default Main;