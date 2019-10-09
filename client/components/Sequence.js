import React from 'react';
import { connect } from 'react-redux';
import Grid from './Grid';
import Tempo from './Tempo';
const Tone = require('Tone');

class Sequence extends React.Component {
  constructor() {
    super();
    this.state = {
      synth1: new Tone.Synth().toMaster(),
      synth2: new Tone.Synth().toMaster(),
      synth3: new Tone.Synth().toMaster(),
      synth4: new Tone.Synth().toMaster()
    };
  }

  render() {
    console.log('SEQ RENDER: ', this.state);
    const synth1 = this.state.synth1;
    const synthPart1 = new Tone.Sequence(
      function(time, note) {
        synth1.triggerAttackRelease(note, '10hz', time);
      },
      this.props.sounds.sound1.map(elem => {
        if (elem) {
          return 'C4';
        } else {
          return null;
        }
      }),
      '8n'
    );

    const synth2 = this.state.synth2;
    const synthPart2 = new Tone.Sequence(
      function(time, note) {
        synth2.triggerAttackRelease(note, '10hz', time);
      },
      this.props.sounds.sound2.map(elem => {
        if (elem) {
          return 'D4';
        } else {
          return null;
        }
      }),
      '8n'
    );

    const synth3 = this.state.synth3;
    const synthPart3 = new Tone.Sequence(
      function(time, note) {
        synth3.triggerAttackRelease(note, '10hz', time);
      },
      this.props.sounds.sound3.map(elem => {
        if (elem) {
          return 'E4';
        } else {
          return null;
        }
      }),
      '8n'
    );

    const synth4 = this.state.synth4;
    const synthPart4 = new Tone.Sequence(
      function(time, note) {
        synth4.triggerAttackRelease(note, '10hz', time);
      },
      this.props.sounds.sound4.map(elem => {
        if (elem) {
          return 'F4';
        } else {
          return null;
        }
      }),
      '8n'
    );

    return (
      <Grid
        sequence1={synthPart1}
        sequence2={synthPart2}
        sequence3={synthPart3}
        sequence4={synthPart4}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds
  };
};

export default connect(mapStateToProps)(Sequence);
