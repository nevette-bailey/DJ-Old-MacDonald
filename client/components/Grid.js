import React from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk } from '../store/reducers/sounds';
import { updateSequencesThunk } from '../store/reducers/sequences';
import Tempo from '../components/Tempo';
import SaveButton from '../components/SaveButton';
import CreateNewLoopButton from '../components/CreateNewLoopButton';
import { timingSafeEqual } from 'crypto';
const Tone = require('Tone');

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      isPlaying: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate() {
    console.log('isPlaying', this.state.isPlaying);
    if (this.state.isPlaying) {
      this.props.sequences.sequence1.start();
      this.props.sequences.sequence2.start();
      this.props.sequences.sequence3.start();
      this.props.sequences.sequence4.start();
      this.props.sequences.sequence5.start();
      this.props.sequences.sequence6.start();
      this.props.sequences.sequence7.start();
      this.props.sequences.sequence8.start();

      Tone.Transport.bpm.value = this.props.tempo;
      this.props.recorder.start();
      Tone.Transport.start();
    }
  }

  handleReset() {
    // Removes the Sequence created in playSounds method to completley clear the events/timeline
    Tone.Transport.cancel();
    // Resets the sound state back to all false
    this.props.resetSoundThunk();
  }

  handleClick = () => {
    const sequences = {
      sequence1: this.props.sequence1,
      sequence2: this.props.sequence2,
      sequence3: this.props.sequence3,
      sequence4: this.props.sequence4,
      sequence5: this.props.sequence5,
      sequence6: this.props.sequence6,
      sequence7: this.props.sequence7,
      sequence8: this.props.sequence8
    };
    if (this.state.isToggleOn) {
      // plays the sequence if nothing is playing
      this.props.updateSequencesThunk(sequences);
      this.setState({ isPlaying: true });
    } else {
      // Stops the sequence if one is playing
      this.props.recorder.stop();
      Tone.Transport.stop();
      this.setState({ isPlaying: false });
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
    return (
      <div className="wrapper">
        <InstrumentRow
          name="sound1"
          sound={this.props.sounds.sound1}
          note="C4"
          sequenceName="sequence1"
          sequence={this.props.sequences.sequence1}
          id="sound1"
        />
        <InstrumentRow
          name="sound2"
          sound={this.props.sounds.sound2}
          note="E4"
          sequenceName="sequence2"
          sequence={this.props.sequence2}
        />
        <InstrumentRow
          name="sound3"
          sound={this.props.sounds.sound3}
          note="G4"
          sequenceName="sequence3"
          sequence={this.props.sequence3}
        />
        <InstrumentRow
          name="sound4"
          sound={this.props.sounds.sound4}
          note="C5"
          sequenceName="sequence4"
          sequence={this.props.sequence4}
        />
        <InstrumentRow
          name="sound5"
          sound={this.props.sounds.sound5}
          note={this.props.synth5}
          duration={0.6}
          sequenceName="sequence5"
          sequence={this.props.sequence5}
        />
        <InstrumentRow
          name="sound6"
          sound={this.props.sounds.sound6}
          note={this.props.synth6}
          duration={1}
          sequenceName="sequence6"
          sequence={this.props.sequence6}
        />
        <InstrumentRow
          name="sound7"
          sound={this.props.sounds.sound7}
          note={this.props.synth7}
          duration={1}
          sequenceName="sequence7"
          sequence={this.props.sequence7}
        />
        <InstrumentRow
          name="sound8"
          sound={this.props.sounds.sound8}
          note={this.props.synth8}
          duration={1}
          sequenceName="sequence8"
          sequence={this.props.sequence8}
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
    sounds: state.sounds,
    sequences: state.sequences,
    tempo: state.tempo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetSoundThunk: () => dispatch(resetSoundThunk()),
    updateSequencesThunk: sequences => dispatch(updateSequencesThunk(sequences))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
