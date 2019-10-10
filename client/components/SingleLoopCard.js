import React from 'react';

const SingleLoopCard = props => {
  const id = props.loop.id;
  const title = props.loop.title || 'Untitled';
  return (
    <div
      className="single-loop-card"
      key={props.loop.id}
      onClick={() => props.handleClick(id)}
    >
      <h3>
        Title: <span>{title}</span>
      </h3>
    </div>
  );
};

export default SingleLoopCard;
