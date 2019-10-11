import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h3>Whoops!</h3>
        <p>Looks like that page doesn't exist.</p>
        <Link to="/grid">
          <button type="button" className="button">
            Return Home
          </button>
        </Link>
      </div>
    );
  }
}

export default NotFound;
