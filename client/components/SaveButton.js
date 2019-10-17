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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.disabledSaveButton = this.disabledSaveButton.bind(this);
    this.saveExisting = this.saveExisting.bind(this);
  }

  //if user is logged in & saving an existing loop, forward the sound and id, title and description in null.
  saveExisting(event) {
    event.preventDefault();
    this.props.saveLoopThunk(this.props.sounds, this.props.loopId);
    toast('Loop Saved!', {
      position: 'bottom-right',
      autoClose: 2000
    });
  }

  // // if user logged in & saving a new loop
  // saveNew() {

  // }

  handleSubmit(event) {
    event.preventDefault();
    //logged in and changes are made to the loops
    if (this.props.user.id && !this.props.isSaved) {
      //if it's a new loop, direct to loopsinfopopup
      if (this.props.loopId === null) {
        this.props.history.push('loopsinfopopup');
      } else {
        //if save an existing loop, forward the sound and id, title and description in null.
        this.props.saveLoopThunk(this.props.sounds, this.props.loopId);
        toast('Loop Saved!', {
          position: 'bottom-right',
          autoClose: 2000
        });
      }
    } else {
      //if not looged in and changes are made to the loops.
      this.props.history.push('authpopup');
    }
  }

  disabledSaveButton() {
    return (
      <div className="icontext">
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="button"
          disabled
        >
          <img
            className="disabled-button-image"
            src="https://img.icons8.com/material-rounded/23/000000/save.png"
          />
        </button>
        Save
      </div>
    );
  }

  render() {
    console.log('loopId :', this.props.loopId);
    console.log('isSaved :', this.props.isSaved);
    return this.props.isSaved ? (
      this.disabledSaveButton()
    ) : this.props.loopId ? (
      <div className="icontext">
        <button
          type="submit"
          onClick={event => this.saveExisting(event)}
          className="button"
        >
          <img src="https://img.icons8.com/material-rounded/28/000000/save.png" />
        </button>
        Save
      </div>
    ) : this.props.user.id ? (
      <Popup
        trigger={
          <div className="icontext">
            <button
              type="submit"
              // onClick={this.handleSubmit}
              className="button"
            >
              <img src="https://img.icons8.com/material-rounded/28/000000/save.png" />
            </button>
            Save
          </div>
        }
        modal
      >
        {close => <LoopsInfoPopup close={close} />}
      </Popup>
    ) : (
      <Popup
        trigger={
          <div className="icontext">
            <button type="submit" className="button">
              <img src="https://img.icons8.com/material-rounded/28/000000/save.png" />
            </button>
            Save
          </div>
        }
        modal
      >
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
