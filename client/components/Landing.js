import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Tone from 'Tone';

class Landing extends React.Component {
  render() {
    Tone.Transport.cancel();
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
