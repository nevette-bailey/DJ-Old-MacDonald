import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk, getSoundThunk } from '../store/reducers/sounds';
const Tone = require('Tone');

// this is just a helper function that transforms an array of true/false values into a note (if true) or null (if false). A note represents a beat and null represents a rest
function createNotes(soundState, note) {
  return soundState.map(beat => {
    if (beat) {
      return note;
    } else {
      return null;
    }
  });
}

class Grid extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
    this.playSounds = this.playSounds.bind(this);
    // this.createNotes = this.createNotes.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  playSounds() {
    const { sound1 } = this.props.sounds;
    let notes = createNotes(sound1, 'C4');
    const synth = new Tone.Synth().toMaster();
    const synth2 = new Tone.Synth().toMaster();

    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time);
      },
      notes,
      '8n'
    );
    const synthPart2 = new Tone.Sequence(
      function(time, note) {
        synth2.triggerAttackRelease(note, '10hz', time);
      },
      [
        'G4',
        'G4',
        'G4',
        null,
        null,
        null,
        'G4',
        'G4',
        'G4',
        null,
        null,
        null,
        'G4',
        'G4',
        'G4',
        'G4'
      ],
      '8n'
    );
    synthPart.start();
    synthPart2.start();
    Tone.Transport.start();
    console.log(Tone.Transport.state);
  }

  handleReset() {
    // Removes the Sequence created in playSounds method to completley clear the events/timeline
    Tone.Transport.cancel();
    // Resets the sound state back to all false
    this.props.resetSoundThunk();
  }

  handleClick = () => {
    if (this.state.isToggleOn) {
      // plays the sequence if nothing is playing
      this.playSounds();
    } else {
      // Stops the sequence if one is playing
      Tone.Transport.stop();
    }
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  render() {
    console.dir(Tone.Transport);
    return (
      <div className="wrapper">
        <InstrumentRow />
        <button type="submit" onClick={this.handleClick} className="button">
          {this.state.isToggleOn ? '>' : '||'}
        </button>
        <button type="submit" onClick={this.handleReset} className="button">
          <img src="https://img.icons8.com/ios-filled/18/000000/recurring-appointment.png" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // sounds is { sound1: [Array 16]}
    sounds: state.sounds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetSoundThunk: () => dispatch(resetSoundThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
