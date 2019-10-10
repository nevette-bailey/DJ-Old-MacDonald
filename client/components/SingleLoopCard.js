import React from 'react';
import { connect } from 'react-redux';

// class SingleLoopCard extends React.Component {
//   render() {
//     return <div className="single-loop-card" />;
//   }
// }

const SingleLoopCard = props => {
  const id = props.loop.id;
  const title = props.loop.title || 'Untitled';
  return (
    <div
      className="single-loop-card"
      key={props.loop.id}
      onClick={() => props.handleClick(id)}
    >
      <h3>Title: {title}</h3>
    </div>
  );
};

export default SingleLoopCard;
// const mapStateToProps = (state) => {
//   return {
//     currentLoop:
//   }
// }
