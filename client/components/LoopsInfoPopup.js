import React from 'react';
import { connect } from 'react-redux';
import { saveLoopThunk, getOneLoopThunk } from '../store/reducers/loops';

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
      this.state.title,
      this.state.description,
      this.props.sounds,
      this.props.loopId
    );
    //
    this.props.history.push('grid');
  }

  render() {
    return (
      <div>
        <div className="container1">
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Details</h1>
              <span>Enter loop details below</span>
              <br />
              <input type="title" placeholder="Title" />
              <input type="description" placeholder="Description" />
              <br />
              <button
                type="submit"
                id="button"
                onChange={this.handleChange}
                onClick={this.handleSubmit}
              >
                Save Loop
              </button>
            </form>
          </div>
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
    saveLoopThunk: (title, description, sounds, loopId) =>
      dispatch(saveLoopThunk(title, description, sounds, loopId)),
    getOneLoopThunk: loopId => dispatch(getOneLoopThunk(loopId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoopsInfoPopup);
