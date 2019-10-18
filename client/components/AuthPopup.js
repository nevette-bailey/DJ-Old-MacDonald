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
      emailError: '',
      password: '',
      passwordError: ''
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailValidate = this.emailValidate.bind(this);
    this.passwordValidate = this.passwordValidate.bind(this);
  }

  componentDidUpdate(prevProps) {
    // if the user successfully signs in or signs up
    if (this.props.userId !== prevProps.userId) {
      if (!this.props.isSaved) {
        // AND if they came here after clicking 'save' on grid, then show them to loops info popup so they can finish saving their loop
        this.props.history.push('loopsinfopopup');
      } else {
        // otherwise, redirect them to the grid so they can start using the app
        this.props.history.push('grid');
      }
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  emailValidate = () => {
    let isError = false;
    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      this.setState({ emailError: 'Requires valid email' });
    }
    return isError;
  };

  passwordValidate = () => {
    let isError = false;
    if (this.state.password.length < 5) {
      isError = true;
      this.setState({
        passwordError: 'Password must be at least 5 characters'
      });
    }
    return isError;
  };

  handleSubmit(method, e) {
    e.preventDefault();
    const emailErr = this.emailValidate();
    const passwordErr = this.passwordValidate();
    if (!emailErr && !passwordErr) {
      this.props.auth(this.state.email, this.state.password, method);
    }
  }

  toggleBox = () => {
    this.setState(prevState => ({
      isRightPanelVisible: !prevState.isRightPanelVisible
    }));
  };

  render() {
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
                <a href="/auth/google" className="social">
                  <i className="fab fa-google" />
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
              {this.state.emailError}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              {this.state.passwordError}
              <button
                type="submit"
                onClick={e => this.handleSubmit('/signup', e)}
              >
                Sign Up
              </button>
              {this.props.error &&
                this.props.error.response && (
                  <div> {this.props.error.response.data} </div>
                )}
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="/auth/google" className="social">
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
              {this.state.emailError}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              {this.state.passwordError}
              <button
                type="submit"
                onClick={e => this.handleSubmit('/login', e)}
              >
                Sign In
              </button>
              {this.props.error &&
                this.props.error.response && (
                  <div>{this.props.error.response.data}</div>
                )}
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
  isSaved: state.loops.isSaved,
  error: state.user.error,
  userId: state.user.id
});

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, method) => dispatch(auth(email, password, method))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthPopup)
);
