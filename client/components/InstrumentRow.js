import React from 'react';
import { updateSoundThunk } from '../store/reducers/sounds';
import { connect } from 'react-redux';
const Tone = require('Tone');

class InstrumentRow extends React.Component {
  makeSound() {
    let note = this.props.note;
    if (note.state && note.loaded) {
      note.start(undefined, undefined, 0.6);
    } else if (!note.state) {
      const synth = new Tone.MembraneSynth().toMaster();
      synth.triggerAttackRelease(note, '8n');
    }
  }

  onClickFunction(soundId, idx) {
    if (!this.props.sound[idx]) {
      this.makeSound();
      this.props.sequence.add(idx, this.props.note);
    } else {
      this.props.sequence.add(idx, null);
    }
    this.props.updateSoundThunk(soundId, idx);
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
