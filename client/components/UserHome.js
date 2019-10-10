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
    this.history.push(null, 'sequence');
  }

  render() {
    return (
      <div>
        <div>
          <h2>Welcome, {this.props.email} !</h2>
        </div>
        <div className="loops-container">
          {this.props.loops ? (
            this.props.loops.map(loop => {
              return (
                <SingleLoopCard
                  handleClick={this.handleClick}
                  loop={loop}
                  key={loop.id}
                />
                // <div className="single-loop" key={loop.id}>
                //   <h4>Loop ID: {loop.id}</h4>

                //   <h4>Loop Title: {loop.title}</h4>
                //   {/* sound1 for now  */}
                //   <h4>Loop Sound: {loop.sound1}</h4>
                //   <br />
                // </div>
              );
            })
          ) : (
            <div>
              <h3>You don't have any saved loops</h3>
              <p>Create one now!</p>
              <CreateNewLoopButton />
            </div>
          )}
        </div>
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
