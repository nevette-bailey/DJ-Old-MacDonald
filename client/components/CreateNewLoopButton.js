import React, { Component } from 'react';
import { createNewLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
class CreateNewLoopButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createNewLoopThunk();
    // onClick={this.handleSubmit}
    close();
  }
  render() {
    return (
      <div>
        <Popup
          trigger={
            <button className="button" type="submit">
              CREATE NEW
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
                Do you want to save the current loop?
              </div>
              <div className="actions">
                <button className="button" type="button">
                  Yes
                </button>

                <button
                  className="button"
                  onClick={this.handleSubmit}
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

const mapDispatchToProps = dispatch => {
  return {
    createNewLoopThunk: () => dispatch(createNewLoopThunk())
  };
};

export default connect(null, mapDispatchToProps)(CreateNewLoopButton);
