import React, { Component } from "react";

import './clock.styles.css';

class Clock extends Component {

    constructor(props) {
      super(props);
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      this.state = {
        time: new Date().toLocaleDateString('de-DE', dateOptions)
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        60000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      this.setState({
        time: new Date().toLocaleDateString('de-DE', dateOptions)
      });
    }
    render() {
      return (
        <p className="Clock">
          {this.state.time}
        </p>
      );
    }
}
  
  export default Clock;