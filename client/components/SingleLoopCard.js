import React from 'react';

const SingleLoopCard = props => {
  const id = props.loop.id;
  const title = props.loop.title || 'Untitled';
  return (
    <div
      className="single-loop-card"
      onClick={() => props.handleClick(id)}
      key={props.loop.id}
    >
      <div className="card-detail-wrapper">
        <h3>
          Title: <span>{title}</span>
        </h3>
        <div>
          <button
            type="button"
            className="delete-loop"
            onClick={event => props.deleteLoop(event, id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleLoopCard;
