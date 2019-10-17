import React from 'react';
import Popup from 'reactjs-popup';
import loops from '../store/reducers/loops';
const Tone = require('Tone');

class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      isRecording: false,
      hasRecorded: false
    };
    this.recordLoop = this.recordLoop.bind(this);
  }
  recordLoop = () => {
    this.setState(prevState => ({
      isRecording: !prevState.isRecording
    }));
    if (this.state.isRecording) {
      this.setState({ hasRecorded: true });
    }
    this.props.record();
  };
  render() {
    // console.log('PROPS', this.props);
    return (
      <div className="icontext" onClick={this.props.handleClick}>
        <Popup
          trigger={
            <button className="button" type="button">
              <img
                src="https://image.flaticon.com/icons/svg/154/154608.svg"
                width="20"
                height="20"
              />
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
                  }}
                >
                  {this.state.isRecording ? 'Stop' : 'Record'}
                </button>
              </div>
              <div>
                {this.state.hasRecorded
                  ? 'Press play to playback recorded loop, and click dots to download'
                  : ''}
              </div>
              <div>
                <audio src={this.props.src} id="audio" controls />
              </div>
              {/* <div>{this.props.recorder.getCurrentDuration()}</div> */}
            </div>
          )}
        </Popup>
        Export
      </div>
    );
  }
}

export default AudioPlayer;
