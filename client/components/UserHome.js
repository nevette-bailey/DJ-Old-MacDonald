import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gotLoopsThunk } from '../store/reducers/loops';

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.gotLoopsThunk();
  }
  render() {
    return (
      <div>
        <div>
          <h2>Welcome, {this.props.email} !</h2>
        </div>
        <div className="loops-container">
          <h3>Here are your Loops:</h3>
          {this.props.loops ? (
            this.props.loops.map(loop => {
              return (
                <div className="single-loop" key={loop.id}>
                  <h4>Loop ID: {loop.id}</h4>

                  <h4>Loop Title: {loop.title}</h4>
                  {/* sound1 for now  */}
                  <h4>Loop Sound: {loop.sound1}</h4>
                  <br />
                </div>
              );
            })
          ) : (
            <div>No loops saved.</div>
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
  gotLoopsThunk: () => dispatch(gotLoopsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
