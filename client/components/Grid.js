import React from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk } from '../store/reducers/sounds';
import { updateSequencesThunk } from '../store/reducers/sequences';
import Tempo from '../components/Tempo';
import SaveButton from '../components/SaveButton';
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
    this.playSounds = this.playSounds.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate() {
    console.log('isPlaying', this.state.isPlaying);
    if (this.state.isPlaying) {
      this.props.sequences.sequence1.start();
      this.props.sequences.sequence2.start();
      this.props.sequences.sequence3.start();
      this.props.sequences.sequence4.start();

      Tone.Transport.start();
    }
  }

  playSounds() {
    this.props.sequences.sequence1.start();
    this.props.sequences.sequence2.start();
    this.props.sequences.sequence3.start();
    this.props.sequences.sequence4.start();

    Tone.Transport.start();
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
      sequence4: this.props.sequence4
    };
    if (this.state.isToggleOn) {
      // plays the sequence if nothing is playing
      this.props.updateSequencesThunk(sequences);
      this.setState({ isPlaying: true });
    } else {
      // Stops the sequence if one is playing
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
    const sequences = this.props.sequences;
    return (
      <div className="wrapper">
        <InstrumentRow
          name="sound1"
          sound={this.props.sounds.sound1}
          note="C4"
          sequence={this.props.sequences.sequence1}
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
          note={this.props.synth4}
          duration={0.6}
          sequenceName="sequence4"
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds,
    sequences: state.sequences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetSoundThunk: () => dispatch(resetSoundThunk()),
    updateSequencesThunk: sequences => dispatch(updateSequencesThunk(sequences))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
