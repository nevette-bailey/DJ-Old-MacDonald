import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Tone from 'Tone';

class Landing extends React.Component {
  componentDidMount() {
    // The only time a user is expected to be here is on their first visit or when they log out, which is why we call Tone.Transport.cancel()
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
            <Link to="/grid" id="landing-cta-link">
              <button type="button" id="landing-cta-button">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
