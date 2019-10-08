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
      sound2: new Tone.PolySynth().toMaster(),
      sound3: new Tone.Player({
        url: 'https://actions.google.com/sounds/v1/animals/crow_call.ogg',
        autostart: true,
        loop: true,
        loopStart: 13.2,
        loopEnd: 14.2
      }).toMaster(),
      sound4: new Tone.Player({
        url: 'https://actions.google.com/sounds/v1/cartoon/clown_horn.ogg',
        autostart: true,
        loop: true,
        loopStart: 0,
        loopEnd: 1
      }).toMaster(),
      sound5: new Tone.Player({
        url:
          'https://actions.google.com/sounds/v1/animals/animal_squealing.ogg',
        autostart: true,
        loop: true,
        loopStart: 1,
        loopEnd: 2.5
      }).toMaster()
    };
  }

  onClickFunction(soundId, idx) {
    // check whether sound should be triggered
    if (
      !this.props.sound1[idx] &&
      this.state.sound1.loaded &&
      this.state.sound3.loaded &&
      this.state.sound4.loaded &&
      this.state.sound5.loaded
    ) {
      //play imported sound when box is clicked
      // this.state.sound1.restart(undefined, undefined, 0.6);
      // this.state.sound3.restart(undefined, undefined, 1);
      // this.state.sound2.triggerAttackRelease('C2', '8n');

      const seq = new Tone.Sequence(function(time, note) {}, [
        this.state.sound1.restart(undefined, undefined, 0.6),
        this.state.sound3.restart(undefined, undefined, 1),
        this.state.sound4.restart(undefined, undefined, 1),
        this.state.sound5.restart(undefined, undefined, 1.5)
      ]);
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
