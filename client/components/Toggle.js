import React, { Component } from 'react';
// import instrumentRow from 'instrumentRow';
import PropTypes from 'prop-types';

class Toggle extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: true };
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    );
  }
}

export default Toggle;
