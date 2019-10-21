import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  gotLoopsThunk,
  getOneLoopThunk,
  createNewLoopThunk,
  deleteLoopThunk
} from '../store/reducers/loops';
import SingleLoopCard from './SingleLoopCard';
const Tone = require('Tone');

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.createNewClick = this.createNewClick.bind(this);
    this.deleteLoop = this.deleteLoop.bind(this);
  }

  componentDidMount() {
    this.props.gotLoopsThunk();
  }

  deleteLoop(event, id) {
    this.props.deleteLoopThunk(id);
    event.stopPropagation();
  }

  handleClick(id) {
    this.props.getOneLoopThunk(id);
    Tone.Transport.cancel();
    this.props.history.push('grid');
  }

  createNewClick() {
    this.props.createNewLoopThunk();
    Tone.Transport.cancel();
    this.props.history.push('grid');
  }

  render() {
    return (
      <div className="my-loops-container">
        <hr />
        <div className="section">
          <h2>Your Account</h2>
          <p className="username">{this.props.email}</p>
        </div>
        {this.props.loops.length !== 0 ? (
          <div className="section">
            <h2>Your Loops</h2>
            <div className="loops-container">
              {this.props.loops.map(loop => {
                return (
                  <SingleLoopCard
                    handleClick={this.handleClick}
                    deleteLoop={this.deleteLoop}
                    makeCopy={this.makeCopy}
                    loop={loop}
                    key={loop.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="section">
            <h2>Your Loops</h2>
            <p>You don't have any saved loops. Create one now!</p>
            <button
              type="button"
              className="button"
              onClick={this.createNewClick}
            >
              Create New Loop
            </button>
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  email: state.user.email,
  loops: state.loops.allLoops
});

const mapDispatchToProps = dispatch => ({
  gotLoopsThunk: () => dispatch(gotLoopsThunk()),
  getOneLoopThunk: id => dispatch(getOneLoopThunk(id)),
  createNewLoopThunk: () => dispatch(createNewLoopThunk()),
  deleteLoopThunk: id => dispatch(deleteLoopThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
