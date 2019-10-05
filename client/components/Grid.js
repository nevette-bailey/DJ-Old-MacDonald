import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk } from '../store/reducers/sounds';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
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
        <button type="submit" onClick={this.handleClick} className="button">
          {this.state.isToggleOn ? '>' : '||'}
        </button>
        <button
          type="submit"
          onClick={() => this.props.resetSoundThunk()}
          className="button"
        >
          <img src="https://img.icons8.com/ios-filled/18/000000/recurring-appointment.png" />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetSoundThunk: () => dispatch(resetSoundThunk())
  };
};

export default connect(null, mapDispatchToProps)(Grid);
