import React from 'react';
import { connect } from 'react-redux';
import Grid from './Grid';
import Tempo from './Tempo';
import AudioPlayer from './AudioPlayer';
const Tone = require('Tone');

class Sequence extends React.Component {
  constructor() {
    super();
    this.state = {
      audioSRC: {},
      synth1: new Tone.Synth().toMaster(),
      synth2: new Tone.Synth().toMaster(),
      synth3: new Tone.Synth().toMaster(),
      synth4: new Tone.Synth().toMaster(),
      synth5: new Tone.Player({
        url: 'https://actions.google.com/sounds/v1/animals/dog_barking.ogg',
        autostart: false,
        loop: true,
        loopStart: 0.4,
        loopEnd: 1
      }).toMaster(),
      synth6: new Tone.Player({
        url: 'https://actions.google.com/sounds/v1/animals/crow_call.ogg',
        autostart: false,
        loop: true,
        loopStart: 13.2,
        loopEnd: 14.2
      }).toMaster(),
      synth7: new Tone.Player({
        url:
          'https://actions.google.com/sounds/v1/animals/animal_squealing.ogg',
        autostart: false,
        loop: true,
        loopStart: 1.5,
        loopEnd: 2.5
      }).toMaster()
    };
  }

  render() {
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
          return 'E4';
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
          return 'G4';
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
          return 'C5';
        } else {
          return null;
        }
      }),
      '8n'
    );

    const synth5 = this.state.synth5;
    const synthPart5 = new Tone.Sequence(
      function(time, duration) {
        synth5.restart(undefined, undefined, duration);
      },
      this.props.sounds.sound5.map(elem => {
        if (elem) {
          return 0.6;
        } else {
          return null;
        }
      }),
      '8n'
    );

    const synth6 = this.state.synth6;
    const synthPart6 = new Tone.Sequence(
      function(time, duration) {
        synth6.restart(undefined, undefined, duration);
      },
      this.props.sounds.sound6.map(elem => {
        if (elem) {
          return 1;
        } else {
          return null;
        }
      }),
      '8n'
    );

    const synth7 = this.state.synth7;
    const synthPart7 = new Tone.Sequence(
      function(time, duration) {
        synth7.restart(undefined, undefined, duration);
      },
      this.props.sounds.sound7.map(elem => {
        if (elem) {
          return 1;
        } else {
          return null;
        }
      }),
      '8n'
    );

    const destination = Tone.context.createMediaStreamDestination();
    this.state.synth1.connect(destination);
    this.state.synth2.connect(destination);
    this.state.synth3.connect(destination);
    this.state.synth4.connect(destination);
    this.state.synth5.connect(destination);
    this.state.synth6.connect(destination);
    this.state.synth7.connect(destination);

    const recorder = new MediaRecorder(destination.stream);
    const chunks = [];
    recorder.ondataavailable = event => chunks.push(event.data);
    recorder.onstop = event => {
      let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
      this.setState({ audioSRC: URL.createObjectURL(blob) });
    };

    return (
      <div>
        <Grid
          sequence1={synthPart1}
          sequence2={synthPart2}
          sequence3={synthPart3}
          sequence4={synthPart4}
          sequence5={synthPart5}
          sequence6={synthPart6}
          sequence7={synthPart7}
          synth5={synth5}
          synth6={synth6}
          synth7={synth7}
          recorder={recorder}
        />
        <AudioPlayer src={this.state.audioSRC} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds
  };
};

export default connect(mapStateToProps)(Sequence);
