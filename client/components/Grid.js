import React from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk } from '../store/reducers/sounds';
import Tempo from '../components/Tempo';
import SaveButton from '../components/SaveButton';
import CreateNewLoopButton from '../components/CreateNewLoopButton';
import { timingSafeEqual } from 'crypto';
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
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.playSounds = this.playSounds.bind(this);
    this.handleReset = this.handleReset.bind(this);
    // this.repeat = this.repeat.bind(this);
  }

  playSounds() {
    // const { sound1 } = this.props.sounds;
    // let notes = createNotes(sound1, 'C4');
    // const synth = new Tone.Synth().toMaster();
    // const synth2 = new Tone.Synth().toMaster();

    // const synthPart = new Tone.Sequence(
    //   function(time, note) {
    //     synth.triggerAttackRelease(note, '10hz', time);
    //   },
    //   notes,
    //   '8n'
    // );
    // const synthPart2 = new Tone.Sequence(
    //   function(time, note) {
    //     synth2.triggerAttackRelease(note, '10hz', time);
    //   },
    //   [
    //     'G4',
    //     'G4',
    //     'G4',
    //     null,
    //     null,
    //     null,
    //     'G4',
    //     'G4',
    //     'G4',
    //     null,
    //     null,
    //     null,
    //     'G4',
    //     'G4',
    //     'G4',
    //     'G4'
    //   ],
    //   '8n'
    // );
    this.props.sequence1.start();
    this.props.sequence2.start();
    this.props.sequence3.start();
    this.props.sequence4.start();

    // synthPart2.start();
    // this.sequence.start();
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
      // Tone.Transport.cancel();
    }
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  // setTempo = () => {
  //   Tone.transport.bmp.value = 180
  // }
  // handleSliderChange = e => {
  //   this.setState({ [bmp]: e.value });
  //   Tone.Transport.bmp.value = value;
  // };

  render() {
    console.dir(Tone.Transport);
    console.log(Tone.Transport.bpm);
    console.log('MY PROPSSSS IN GRID: ', this.props);
    return (
      <div className="wrapper">
        <InstrumentRow
          name="sound1"
          sound={this.props.sounds.sound1}
          note="C4"
          sequence={this.props.sequence1}
        />
        <InstrumentRow
          name="sound2"
          sound={this.props.sounds.sound2}
          note="D4"
          sequence={this.props.sequence2}
        />
        <InstrumentRow
          name="sound3"
          sound={this.props.sounds.sound3}
          note="E4"
          sequence={this.props.sequence3}
        />
        <InstrumentRow
          name="sound4"
          sound={this.props.sounds.sound4}
          note="F4"
          sequence={this.props.sequence4}
        />
        <div className="buttons">
          <button type="submit" onClick={this.handleClick} className="button">
            {this.state.isToggleOn ? '>' : '||'}
          </button>
          <button type="submit" onClick={this.handleReset} className="button">
            <img src="https://img.icons8.com/ios-filled/18/000000/recurring-appointment.png" />
          </button>
          <Tempo onChange={this.handleSliderChange} />
          <SaveButton />
          <CreateNewLoopButton />
        </div>
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
