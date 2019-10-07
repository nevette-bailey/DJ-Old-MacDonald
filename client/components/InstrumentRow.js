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
        time: '1'
        // loop: true,
        // loopEnd: 1,
        // mute: false
      }).toMaster(),
      sound2: new Tone.MembraneSynth().toMaster()
    };
  }
  // toggleSwitch = event => {
  //
  // }

  // componentDidMount() {
  //   this.setState({ sound1: { mute: true } });
  //   this.state.sound1.start();
  //   this.state.sound1.stop();
  // }

  onClickFunction(soundId, idx) {
    // update boolean value of box in redux state

    // check whether sound should be triggered
    if (!this.props.sound1[idx] && this.state.sound1.loaded) {
      //play imported sound when box is clicked
      this.state.sound1.start(0);
      this.state.sound1.stop('2n');

      //create a sound when box is clicked
      // this.synth.triggerAttackRelease('C4', '4n');
    } else {
      this.state.sound1.stop();
    }
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
