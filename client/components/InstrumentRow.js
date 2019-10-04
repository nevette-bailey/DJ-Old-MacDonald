import React from 'react';
import { updateSoundThunk } from '../store/reducers/sounds';
import { connect } from 'react-redux';
const Tone = require('Tone');

class InstrumentRow extends React.Component {
  // toggleSwitch = event => {
  //
  // }
  // };
  // const synth = new Tone.Player('https://actions.google.com/sounds/v1/animals/animal_squealing.ogg', function(){}).toMaster();
  // makeSound() {
  //   this.synth.start();
  // }

  // stopSound() {
  //   this.synth.stop()
  // }

  onClickFunction(soundId, idx) {
<<<<<<< HEAD
    this.props.updateSound(soundId, idx);

    const synth = new Tone.Player({
      url: 'https://actions.google.com/sounds/v1/animals/animal_squealing.ogg',
      autostart: true,
      loopEnd: 1
    }).toMaster();
    if (!this.props.sound1[idx]) synth.start();
    if (this.props.sound1[idx]) synth.stop();
=======
    this.props.updateSoundThunk(soundId, idx);
    if (!this.props.sound1[idx]) this.makeSound();
>>>>>>> 7936f7f7f127ef9a7e042142400efb9a4f9170dc
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
              // onClick={() => this.props.updateSoundThunk('sound1', idx)}
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
