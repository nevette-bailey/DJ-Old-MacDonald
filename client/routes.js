import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, UserHome } from './components';
import { me } from './store';
import InstrumentRow from './components/InstrumentRow_ExternalSounds';
import Grid from './components/Grid';
import Sequence from './components/Sequence';
import SaveButton from './components/SaveButton';
import Tempo from './components/Tempo';
import AuthPopup from './components/AuthPopup';
import LoopsInfoPopup from './components/LoopsInfoPopup';
import Landing from './components/Landing';
import NotFound from './components/NotFound';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/instrumentrow" component={InstrumentRow} />
        <Route path="/grid" component={Sequence} />
        <Route path="/savebutton" component={SaveButton} />
        <Route path="/tempo" component={Tempo} />
        <Route path="/authpopup" component={AuthPopup} />
        <Route path="/loopsinfopopup" component={LoopsInfoPopup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
