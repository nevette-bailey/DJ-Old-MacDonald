import React from 'react';
import { updateSoundThunk } from '../store/reducers/sounds';
import { updateOneSequenceThunk } from '../store/reducers/sequences';
import { connect } from 'react-redux';
const Tone = require('Tone');

class InstrumentRow extends React.Component {
  makeSound() {
    let note = this.props.note;
    if (note.state && note.loaded) {
      note.start(undefined, undefined, this.props.duration);
    } else if (!note.state) {
      const synth = new Tone.MembraneSynth().toMaster();
      synth.triggerAttackRelease(note, '8n');
    }
  }

  onClickFunction(soundId, idx, sequenceName) {
    if (!this.props.sound[idx]) {
      this.makeSound();
      if (this.props.note.state && this.props.note.loaded) {
        this.props.updateOneSequenceThunk(
          sequenceName,
          idx,
          this.props.duration
        );
      } else {
        this.props.updateOneSequenceThunk(sequenceName, idx, this.props.note);
      }
    } else {
      this.props.updateOneSequenceThunk(sequenceName, idx, [null]);
    }
    this.props.updateSoundThunk(soundId, idx);
  }

  render() {
    return (
      <div className="row">
        {this.props.sound.map((elem, idx) => {
          return (
            <div
              className={`${elem}`}
              data-index={idx}
              key={idx}
              value={elem}
              onClick={() =>
                this.onClickFunction(
                  this.props.name,
                  idx,
                  this.props.sequenceName
                )
              }
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
      dispatch(updateSoundThunk(soundId, arrIndex)),
    updateOneSequenceThunk: (sequence, idx, param) =>
      dispatch(updateOneSequenceThunk(sequence, idx, param))
  };
};

export default connect(null, mapDispatchToProps)(InstrumentRow);
