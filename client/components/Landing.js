import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Tone from 'Tone';

class Landing extends React.Component {
  componentDidMount() {
    // the only time a user is expected to be here is on their first visit or when they log out, which is why we call Tone.Transport.cancel()
    // That said, if they hit back or edit the URL bar, the transport will be canceled and that could be an issue if they're in the middle of a loop
    Tone.Transport.cancel();
  }

  render() {
    return (
      <div id="landing-overlay" className="landing-wrapper">
        <Navbar />
        <div className="landing-wrapper">
          <h1 id="landing-h1">A hip noise-making app</h1>
          <p>Create your own beats using our unconventional sounds</p>
          <div className="cta-button-wrapper">
            <button type="button" id="landing-cta-button">
              <Link to="/grid">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
