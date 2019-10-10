import React from 'react';
const Tone = require('Tone');

class AudioPlayer extends React.Component {
  render() {
    return (
      <div>
        <audio src={this.props.src} controls />
      </div>
    );
  }
}

export default AudioPlayer;
