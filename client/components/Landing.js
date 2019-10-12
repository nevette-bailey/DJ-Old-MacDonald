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
          <h1>Some text to explain things</h1>
          <p>A really fun tag line!</p>
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
