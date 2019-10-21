import React from 'react';
import { connect } from 'react-redux';
import {
  saveLoopThunk,
  getOneLoopThunk,
  copyLoopThunk
} from '../store/reducers/loops';
//import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class LoopsInfoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? `Copy of ${this.props.title}` : '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    // isCopy is only defined if this is loaded from the SingleLoopCard
    if (this.props.isCopy) {
      e.preventDefault();
      this.props.copyLoopThunk(this.props.originalId, {
        title: this.state.title,
        description: this.state.description
      });
      this.props.close();
      toast('Copy Created!', {
        position: 'bottom-right',
        autoClose: 2000
      });
    } else {
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
  }

  render() {
    return (
      <div className="popup-body">
        <div className="container1">
          <form action="#">
            <h1>
              {this.props.isCopy ? 'Duplicate your loop' : 'Save your loop'}
            </h1>
            <span>Enter loop details below</span>
            <br />
            <input
              type="title"
              autoFocus={true}
              placeholder="Title"
              name="title"
              value={this.state.title}
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
              onClick={e => this.handleSubmit(e, this.props.close)}
            >
              {this.props.isCopy ? 'Create Copy' : 'Save Loop'}
            </button>
          </form>
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
    copyLoopThunk: (originalId, newDetails) =>
      dispatch(copyLoopThunk(originalId, newDetails)),
    getOneLoopThunk: loopId => dispatch(getOneLoopThunk(loopId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoopsInfoPopup)
);
