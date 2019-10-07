import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk, getSoundThunk } from '../store/reducers/sounds';
const Tone = require('Tone');

// this is just a helper function that transforms an array of true/false values into a note (if true) or null (if false). A note represents a beat and null represents a rest
function createNotes(soundState, note) {
  let notes = [];
  for (let i = 0; i < soundState.length; i++) {
    if (soundState[i]) {
      notes.push(note);
    } else {
      notes.push(null);
    }
  }
  return notes;
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

  // This is essentially the same function as the helper function above. Not sure if there's a reason to use one over the other, which is why I'm leaving this commented out in the code for now.
  // Accepts an array of true/false values and a note (e.g. 'C4')
  // and returns an array containing note/null
  // where null represents a rest and a note is a beat
  // createNotes(soundState, note) {
  //   let notes = [];
  //   for (let i = 0; i < soundState.length; i++) {
  //     if (soundState[i]) {
  //       notes.push(note);
  //     } else {
  //       notes.push(null);
  //     }
  //   }
  //   return notes;
  // }

  playSounds() {
    const { sound1 } = this.props.sounds;
    let notes = createNotes(sound1, 'C4');
    const synth = new Tone.MembraneSynth().toMaster();

    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time);
      },
      notes,
      '8n'
    );
    synthPart.start();
    Tone.Transport.start();
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
