import React from 'react';
import { connect } from 'react-redux';
import Grid from './Grid';
const Tone = require('Tone');

class Sequence extends React.Component {
  constructor() {
    super();
    this.state = {
      synth1: new Tone.Synth().toMaster()
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
    return <Grid sequence={synthPart1} />;
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds
  };
};

export default connect(mapStateToProps)(Sequence);
