import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import Tab from "../tab/tab.component";

import "./tabs.styles.css";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label 
    };
  }

  onClickAddProject = () => {
    alert("Frodo was here!");
  };

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
            {children.map(child => {
              const { label } = child.props;

              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                />
              );
            })}
            <li className="tab-list-item" onClick={onClickAddProject}>
              <FontAwesomeIcon icon={faPlus} />
            </li>
          </ol>
          <div className="tab-content">
            {children.map(child => {
              if (child.props.label !== activeTab) return undefined;
              return child.props.children;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="Tabs">
          <ol className="tab-list">
            <li className="tab-list-item" onClick={onClickAddProject}>
              <FontAwesomeIcon icon={faPlus} />
            </li>
          </ol>
          <div className="tab-content">&nbsp;</div>
        </div>
      );
    }
  }
}

export default Tabs;
