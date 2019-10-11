import React, { Component } from 'react';
import { saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';

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
        // toast('Loop Saved!', {
        //   position: 'bottom-right',
        //   autoClose: 2000
        // });
      }
    } else {
      //if not looged in and changes are made to the loops
      console.log('historyyyyy', this.props.history);
      this.props.history.push('authpopup');
    }
  }

  showPopup() {}

  render() {
    return (
      <div>
        <button type="submit" onClick={this.handleSubmit} className="button">
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds,
    loopId: state.loops.id,
    isSaved: state.isSaved,
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
