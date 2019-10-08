import React from 'react';
import { updateSoundThunk } from '../store/reducers/sounds';
import { connect } from 'react-redux';
const Tone = require('Tone');

class InstrumentRow extends React.Component {
  constructor() {
    super();
    this.state = {
      sound1: new Tone.Player({
        url: 'https://actions.google.com/sounds/v1/animals/dog_barking.ogg',
        autostart: true,
        loop: true,
        loopStart: 0.4,
        loopEnd: 1
      }).toMaster(),
      sound2: new Tone.PolySynth().toMaster()
    };
  }

  onClickFunction(soundId, idx) {
    // check whether sound should be triggered
    if (!this.props.sound1[idx] && this.state.sound1.loaded) {
      //play imported sound when box is clicked
      this.state.sound1.restart(undefined, undefined, 0.6);
    }
    // update boolean value of box in redux state
    this.props.updateSoundThunk(soundId, idx);
  }

  render() {
    return (
      <div className="row">
        {this.props.sound1.map((elem, idx) => {
          return (
            <div
              className={`${elem}`}
              data-index={idx}
              key={idx}
              value={elem}
              onClick={() => this.onClickFunction('sound1', idx)}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sound1: state.sounds.sound1
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSoundThunk: (soundId, arrIndex) =>
      dispatch(updateSoundThunk(soundId, arrIndex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentRow);
