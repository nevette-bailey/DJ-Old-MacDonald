import React from 'react';
import { updateSound } from '../store/reducers/sounds';
import { connect } from 'react-redux';
const Tone = require('Tone');

class InstrumentRow extends React.Component {
  // toggleSwitch = event => {
  //
  // };
  makeSound() {
    const synth = new Tone.MembraneSynth().toMaster();
    synth.triggerAttackRelease('C4', '4n');
  }

  onClickFunction(soundId, idx) {
    this.props.updateSound(soundId, idx);
    if (!this.props.sound1[idx]) this.makeSound();
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
    updateSound: (soundId, arrIndex) => dispatch(updateSound(soundId, arrIndex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentRow);
