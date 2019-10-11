import React from 'react';
import Popup from 'reactjs-popup';
const Tone = require('Tone');

class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      isRecording: false
    };
    this.recordLoop = this.recordLoop.bind(this);
  }
  recordLoop = () => {
    this.setState(prevState => ({
      isRecording: !prevState.isRecording
    }));
    this.props.record();
  };
  render() {
    return (
      <Popup
        trigger={
          <button className="button" type="button">
            Export Loop
          </button>
        }
        modal
      >
        {close => (
          <div className="modal">
            <div className="content">
              Press record to begin exporting current loop.
            </div>
            <div className="actions">
              <button
                className="button"
                type="button"
                onClick={() => {
                  this.recordLoop();
                  // close();
                }}
              >
                {this.state.isRecording ? 'Stop' : 'Record'}
              </button>
            </div>
            <div>
              <audio src={this.props.src} controls />
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default AudioPlayer;
