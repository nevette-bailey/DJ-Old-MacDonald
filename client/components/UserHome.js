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
    // console.log('**** here is the props', this.props.allLoops);
    // const { email } = this.props.email;

    return (
      <div>
        <div>
          <h2>Welcome, {this.props.email} !</h2>
        </div>
        <div>
          <h3>Here are your Loops:</h3>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  email: state.user,
  allLoops: state.loops
});

const mapDispatchToProps = dispatch => ({
  gotLoopsThunk: () => dispatch(gotLoopsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// };
