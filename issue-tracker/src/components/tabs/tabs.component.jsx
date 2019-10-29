import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import Tab from "../tab/tab.component";

import "./tabs.styles.css";
import NewProjectPopup from "../newProjectPopup/newProjectPopup.component";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
      showPopup: false
    };
  }

  setPopupState = value => {
    this.setState({
      showPopup: value
    });
  }

  onClickAddProject = () => {
    this.setPopupState(true);
  };

  createNewProject = (data) => {
    this.setPopupState(false);
    this.props.createRemoteProject(data);
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      onClickAddProject,
      props: { children },
      state: { activeTab }
    } = this;

    if (children) {
      return (
        <div className="Tabs">
          <ol className="tab-list">
            {children.map((child,index) => {
              const { label } = child.props;
              return (
                <span key={index}>
                  <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                  />
                  <NewProjectPopup key={label+'-'+index} show={this.state.showPopup} title={"New Project"}
                    onCloseRequest={() => this.setPopupState(false)}
                    onNewProjectCreated={this.createNewProject}
                  />
                </span>
              );
            })}
            <li className="tab-list-item" onClick={onClickAddProject}>
              <FontAwesomeIcon icon={faPlus} />
            </li>
          </ol>
          <div className="tab-content">
            {children.map((child) => {
              if (child.props.label !== activeTab) return undefined;
              return child.props.children;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="Tabs">
          <NewProjectPopup show={this.state.showPopup} title={"New Project"}
            onCloseRequest={() => this.setPopupState(false)}
            onNewProjectCreated={this.createNewProject}
          />
          <ol className="tab-list">
            <li className="tab-list-item" onClick={onClickAddProject}>
              <FontAwesomeIcon icon={faPlus} />
            </li>
          </ol>
          <div className="tab-content"><p>To start: create a project with the "+" and add issues...</p></div>
        </div>
      );
    }
  }
}

export default Tabs;
