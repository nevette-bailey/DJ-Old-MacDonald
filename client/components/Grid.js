import React from 'react';
import { connect } from 'react-redux';
import InstrumentRow from './InstrumentRow';
import { resetSoundThunk } from '../store/reducers/sounds';
import Tempo from '../components/Tempo';
import SaveButton from '../components/SaveButton';
import { timingSafeEqual } from 'crypto';
const Tone = require('Tone');

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.playSounds = this.playSounds.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  playSounds() {
    this.props.sequence1.start();
    this.props.sequence2.start();
    this.props.sequence3.start();
    this.props.sequence4.start();

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
      // send sequences to redux state here
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
          note={this.props.synth4}
          duration={0.6}
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
    sounds: state.sounds
    //import sequences from redux store here
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetSoundThunk: () => dispatch(resetSoundThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
