import React, { Component } from 'react';
import { saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class SaveButton extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      console.log('historyyyyy', this.props.history);
      this.props.history.push('authpopup');
    }
  }

  showPopup() {}

  render() {
    console.log('loopId :', this.props.loopId);
    console.log('isSaved :', this.props.isSaved);
    return this.props.isSaved ? (
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
    ) : (
      <div className="icontext">
        <button type="submit" onClick={this.handleSubmit} className="button">
          <img src="https://img.icons8.com/material-rounded/28/000000/save.png" />
        </button>
        Save
      </div>
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
