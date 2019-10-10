import React, { Component } from 'react';
import { saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SaveButton extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.saveLoopThunk(this.props.sounds, this.props.loopId);
    toast('Loop Saved!', {
      position: 'bottom-right',
      autoClose: 2000
    });
  }

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
    loopId: state.loops.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoopThunk: (newLoop, id) => dispatch(saveLoopThunk(newLoop, id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
