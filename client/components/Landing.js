import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
      <div className="landing-wrapper">
        <h1 />
        <p />
        <button type="button" id="landing-cta-button">
          <Link to="/grid">Let's Make Some Noise</Link>
        </button>
      </div>
    );
  }
}

export default Landing;
