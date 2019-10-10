import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gotLoopsThunk, getOneLoopThunk } from '../store/reducers/loops';
import SingleLoopCard from './SingleLoopCard';
import CreateNewLoopButton from './CreateNewLoopButton';

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.gotLoopsThunk();
  }

  handleClick(id) {
    this.props.getOneLoopThunk(id);
    this.props.history.push('grid');
  }

  render() {
    return (
      <div>
        <div>
          <h2>Welcome, {this.props.email} !</h2>
        </div>
        {this.props.loops.length !== 0 ? (
          <div>
            <h2>Your Loops</h2>
            <div className="loops-container">
              {this.props.loops.map(loop => {
                return (
                  <SingleLoopCard
                    handleClick={this.handleClick}
                    loop={loop}
                    key={loop.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h3>You don't have any saved loops</h3>
            <p>Create one now!</p>
            <CreateNewLoopButton />
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
  getOneLoopThunk: id => dispatch(getOneLoopThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
