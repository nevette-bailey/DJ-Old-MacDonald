import React from 'react';
import Popup from 'reactjs-popup';
import loops from '../store/reducers/loops';
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
      <div className="icontext">
        <Popup
          trigger={
            <button className="button" type="button">
              <img src="https://img.icons8.com/ios-glyphs/26/000000/export.png" />
            </button>
          }
          modal
        >
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="content">
                Press record to begin exporting current loop
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
        Export loop
      </div>
    );
  }
}

export default AudioPlayer;
