import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/reducers/user';
import { withRouter } from 'react-router-dom';

class AuthPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRightPanelVisible: true,
      email: '',
      password: ''
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(method, e) {
    this.props.auth(this.state.email, this.state.password, method);
    // if a visitor is coming from regular login/signup flow, then push them to the music maker grid
    if (this.props.isSaved) {
      this.props.history.push('grid');
    } else {
      // if the visitor arrived here after clicking save on grid, then show them to loops info popup so they can finish saving their loop
      this.props.history.push('loopsinfopopup');
    }
  }

  toggleBox = () => {
    console.log('TOGGLE***', this.state.isRightPanelVisible);
    this.setState(prevState => ({
      isRightPanelVisible: !prevState.isRightPanelVisible
    }));
  };

  render() {
    console.log('AUTH POPUP', console.log(this.props));
    let containerToggle = 'container';
    if (!this.state.isRightPanelVisible) {
      containerToggle = 'container right-panel-active';
    }
    return (
      <div className="popup-body">
        <div className={containerToggle} id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google" />
                </a>
              </div>
              <span>or use your email for registration</span>
              {/* <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
              /> */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                onClick={e => this.handleSubmit('/signup', e)}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google" />
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                id="button"
                onClick={e => this.handleSubmit('/login', e)}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Sign in</h1>
                <p>To save your loops please login with your personal info</p>
                <button
                  type="submit"
                  className="ghost"
                  id="signIn"
                  onClick={this.toggleBox}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Create an account</h1>
                <p>Enter your personal details and save loops</p>
                <button
                  type="submit"
                  className="ghost"
                  id="signUp"
                  onClick={this.toggleBox}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isSaved: state.loops.isSaved
});

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, method) => dispatch(auth(email, password, method))
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(AuthPopup);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthPopup)
);
