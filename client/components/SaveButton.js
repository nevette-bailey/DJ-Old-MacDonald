import React, { Component } from 'react';
import { saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import LoopsInfoPopup from './LoopsInfoPopup';
import AuthPopup from './AuthPopup';

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.saveExisting = this.saveExisting.bind(this);
    this.disabledSaveButton = this.disabledSaveButton.bind(this);
    this.popupSaveButton = this.popupSaveButton.bind(this);
  }

  // if user is logged in & saving an existing loop, forward the sound and id, title and description in null.
  saveExisting(event) {
    event.preventDefault();
    this.props.saveLoopThunk(this.props.sounds, this.props.loopId);
    toast('Loop Saved!', {
      position: 'bottom-right',
      autoClose: 2000
    });
  }

  // method to render the save button that's wrapped in the popup
  popupSaveButton() {
    return (
      <div className="icontext">
        <button type="submit" className="button">
          <img
            src="https://image.flaticon.com/icons/svg/60/60959.svg"
            width="20"
            height="20"
          />
        </button>
        Save
      </div>
    );
  }

  // method to render the disabled save button when there are no changes to the grid
  disabledSaveButton() {
    return (
      <div className="icontext">
        <button type="submit" className="button" disabled>
          <img
            className="disabled-button-image"
            src="https://image.flaticon.com/icons/svg/60/60959.svg"
            width="20"
            height="20"
          />
        </button>
        Save
      </div>
    );
  }

  render() {
    return this.props.isSaved ? (
      // if there are no changes to the grid, render the disabled save button
      this.disabledSaveButton()
    ) : this.props.loopId ? (
      // if the user is logged in and editing an existing loop, render save button with click handler to save an existing loop
      <div className="icontext">
        <button
          type="submit"
          onClick={event => this.saveExisting(event)}
          className="button"
        >
          <img
            src="https://image.flaticon.com/icons/svg/60/60959.svg"
            width="20"
            height="20"
          />
        </button>
        Save
      </div>
    ) : this.props.user.id ? (
      // if a user is logged in and is editing a new loop, render save button that will show LoopsInfoPopup when clicked
      <Popup trigger={this.popupSaveButton()} modal>
        {close => <LoopsInfoPopup close={close} />}
      </Popup>
    ) : (
      // if user is a guest and has made changes to the grid, render save button that will show AuthPopup when clicked
      <Popup trigger={this.popupSaveButton()} modal>
        {close => <AuthPopup close={close} />}
      </Popup>
    );
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds,
    loopId: state.loops.id,
    isSaved: state.loops.isSaved,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoopThunk: (newLoop, id) => dispatch(saveLoopThunk(newLoop, id))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SaveButton)
);
