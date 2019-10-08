import React from 'react';
import { updateSoundThunk } from '../store/reducers/sounds';
import { connect } from 'react-redux';
const Tone = require('Tone');

class InstrumentRow extends React.Component {
  makeSound() {
    const synth = new Tone.MembraneSynth().toMaster();
    synth.triggerAttackRelease(this.props.note, '8n');
  }

  onClickFunction(soundId, idx) {
    console.log('SEQUENCE', this.props.sequence);
    console.log('click function!');
    this.props.updateSoundThunk(soundId, idx);
    if (!this.props.sound[idx]) {
      this.makeSound();
      this.props.sequence.add(idx, this.props.note);
    } else {
      this.props.sequence.add(idx, null);
    }
  }

  render() {
    // console.log(this.props.sound);
    return (
      <div className="row">
        {this.props.sound.map((elem, idx) => {
          return (
            <div
              className={`${elem}`}
              data-index={idx}
              key={idx}
              value={elem}
              onClick={() => this.onClickFunction(this.props.name, idx)}
            />
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSoundThunk: (soundId, arrIndex) =>
      dispatch(updateSoundThunk(soundId, arrIndex))
  };
};

export default connect(null, mapDispatchToProps)(InstrumentRow);
