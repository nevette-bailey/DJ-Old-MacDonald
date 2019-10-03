import React, { Component } from 'react';
import InstrumentRow from './InstrumentRow';
import PropTypes from 'prop-types';

class Grid extends React.Component {
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
      <div className="wrapper">
        <InstrumentRow />
        <button onClick={this.handleClick} className="button">
          {this.state.isToggleOn ? '>' : '||'}
        </button>
      </div>
    );
  }
}

export default Grid;
