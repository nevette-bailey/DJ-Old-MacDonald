import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import LoopsInfoPopup from './LoopsInfoPopup';

class SingleLoopCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.loop.id;
    const title = this.props.loop.title || 'Untitled';
    const description = this.props.loop.description || '';
    return (
      <div className="single-loop-card" key={this.props.loop.id}>
        <div className="card-detail-wrapper">
          <div>
            <h3>
              Title: <span>{title}</span>
            </h3>
            <p>{description}</p>
          </div>
          <div className="loop-button-div">
            <button
              className="delete-loop"
              type="button"
              onClick={event => this.props.deleteLoop(event, id)}
            >
              Delete
            </button>
            <div>
              <Popup
                trigger={
                  <button type="button" className="view-loop">
                    Copy
                  </button>
                }
                modal
              >
                {close => (
                  <LoopsInfoPopup
                    close={close}
                    title={title}
                    isCopy={true}
                    originalId={id}
                  />
                )}
              </Popup>
              <button
                className="view-loop"
                type="button"
                onClick={() => this.props.handleClick(id)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleLoopCard;
