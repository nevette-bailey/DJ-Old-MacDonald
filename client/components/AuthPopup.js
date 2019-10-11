import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/reducers/user';

class AuthPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      isRightPanelVisible: true,
      name: '',
      email: '',
      password: ''
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('eeee', e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(name, email, password) {
    //what if name is not defined .
    this.props.auth(name, email, password);
    this.props.history.push('loopsinfopopup');
    // if (!this.props.isSaved) {
    //   // ask user to input the loops detail in the form and save them
    //redirect to the popup
    // } else {
    //   this.props.history.push('grid');
    // }
  }

  toggleBox = () => {
    console.log('TOGGLE***', this.state.isRightPanelVisible);
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
      <div>
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
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
              />
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
              <button type="submit" onClick={this.handleSubmit}>
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
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
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
              <button type="submit" id="button" onClick={this.handleSubmit}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
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
                <h1>Hello, Friend!</h1>
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
  //method? in the statefield?
  return {
    auth: (name, email, password) => dispatch(name, email, password)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPopup);
