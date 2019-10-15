import React from 'react';

const SingleLoopCard = props => {
  const id = props.loop.id;
  const title = props.loop.title || 'Untitled';
  const description = props.loop.description || '';
  return (
    <div
      className="single-loop-card"
      // onClick={() => props.handleClick(id)}
      key={props.loop.id}
    >
      <div className="card-detail-wrapper">
        <div>
          <h3>
            Title: <span>{title}</span>
          </h3>
          <p>{description}</p>
        </div>
        <div className="loop-button-div">
          <button
            className="delete-loop"
            type="button"
            onClick={event => props.deleteLoop(event, id)}
          >
            Delete
          </button>
          <button
            className="view-loop"
            type="button"
            onClick={() => props.handleClick(id)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleLoopCard;
