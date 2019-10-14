import React from 'react';
import { connect } from 'react-redux';
import { saveLoopThunk, getOneLoopThunk } from '../store/reducers/loops';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class LoopsInfoPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.saveLoopThunk(
      this.props.sounds,
      this.props.loopId,
      this.state.title,
      this.state.description
    );
    this.props.history.push('grid');

    toast('Loop Saved!', {
      position: 'bottom-right',
      autoClose: 2000
    });
  }

  render() {
    return (
      <div className="popup-body">
        <div className="container1">
          {/* <div className="form-container sign-in-container"> */}
          <form action="#">
            <h1>Details</h1>
            <span>Enter loop details below</span>
            <br />
            <input
              type="title"
              placeholder="Title"
              name="title"
              onChange={e => this.handleChange(e)}
            />
            <input
              type="description"
              placeholder="Description"
              name="description"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <button
              type="submit"
              id="button"
              onClick={e => this.handleSubmit(e)}
            >
              Save Loop
            </button>
          </form>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sounds: state.sounds,
    loopId: state.loops.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoopThunk: (sounds, loopId, title, description) =>
      dispatch(saveLoopThunk(sounds, loopId, title, description)),
    getOneLoopThunk: loopId => dispatch(getOneLoopThunk(loopId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoopsInfoPopup)
);
