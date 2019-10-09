import React, { Component } from 'react';
const Tone = require('Tone');

class Tempo extends Component {
  constructor() {
    super();
    this.state = {
      defaultValue: 120
    };
  }

  handleChange = e => {
    this.setState({ defaultValue: e.target.value });
  };

  render() {
    return (
      <div className="slidecontainer">
        <input
          type="range"
          min="0"
          max="240"
          defaultValue="120"
          className="slider"
          id="myRange"
          onChange={this.handleChange}
        />
        BPM: {this.state.defaultValue}
        {/* <span id="demo" /> */}
      </div>
    );
  }
}

export default Tempo;
