import React, { Component } from 'react';
import { createNewLoopThunk, saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
class CreateNewLoopButton extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleCreate(event) {
    event.preventDefault();
    this.props.createNewLoopThunk();
  }
  handleSave(event) {
    event.preventDefault();
    this.props.saveLoopThunk(this.props.sounds, this.props.loopId);
  }
  render() {
    return (
      <div>
        <Popup
          trigger={
            <button className="button" type="submit">
              Create New
            </button>
          }
          modal
        >
          {close => (
            <div className="modal">
              <div className="content">
                Do you want to save the current loop before creating a new one?
              </div>
              <div className="actions">
                <button
                  className="button"
                  type="button"
                  onClick={event => {
                    this.handleSave(event);
                    close();
                  }}
                >
                  Yes
                </button>

                <button
                  className="button"
                  onClick={event => {
                    this.handleCreate(event);
                    close();
                  }}
                  type="submit"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </Popup>
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
    saveLoopThunk: (newLoop, id) => dispatch(saveLoopThunk(newLoop, id)),
    createNewLoopThunk: () => dispatch(createNewLoopThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateNewLoopButton
);
