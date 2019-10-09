import React, { Component } from 'react';
import { createNewLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';

class CreateNewLoopButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createNewLoopThunk();
  }
  render() {
    return (
      <div>
        <button className="button" type="submit" onClick={this.handleSubmit}>
          CREATE NEW
        </button>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//     return {

//     };
//   };

const mapDispatchToProps = dispatch => {
  return {
    createNewLoopThunk: () => dispatch(createNewLoopThunk())
  };
};

export default connect(null, mapDispatchToProps)(CreateNewLoopButton);
