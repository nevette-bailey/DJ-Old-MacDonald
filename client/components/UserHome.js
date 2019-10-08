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
    this.props.getLoops();
  }
  render() {
    console.log('**** here is the props', this.props);
    // const { email } = this.props.email;

    return (
      <div>
        <div>
          <h2>Welcome, {this.props.email} !</h2>
        </div>
        <div className="loops-contanier">
          <h3>Here are your loops:</h3>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
  userLoops: state.userLoops
});

const mapDispatch = dispatch => ({
  getLoops: () => dispatch(gotLoopsThunk())
});

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
