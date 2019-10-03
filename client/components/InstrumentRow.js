import React from 'react';
import { updateSound } from '../store/reducers/sounds';
import { connect } from 'react-redux';

class InstrumentRow extends React.Component {
  constructor() {
    super();
    this.state = {
      bool: false
    };
  }
  //   this.state = {
  //     // name: '',
  //     // data: [
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false,
  //     //   false
  //     // ]
  //   };
  //   // this.toggleSwitch = this.toggleSwitch.bind(this);
  // }
  // componentDidMount() {
  //   this.setState();
  // }

  toggleSwitch = event => {
    // the className of the div corresponds to its position in the data array
    // but that might be a really janky way to do this
    console.log(event.target.getAttribute('data-index'), 'toggle switch!');
    const idx = event.target.getAttribute('data-index');
    // let idx = event.target.className;
    // let newData = [...this.state.data];
    // newData[idx] = !newData[idx];
    // this.setState({ data: newData });
    this.props.updateSound('sound1', idx);
    // if (this.props.sound1) {
    // console.log(this.props.sound1, 'SOUND1')}
    console.log('CLASS NAME', event.target);
    this.setState({ bool: true });
  };

  render() {
    // console.log('State!!!', this.state.data);
    // let divArray = [...this.state.data];
    console.log(this.props.sound1, 'PROPS');
    return (
      <div className="row">
        {this.props.sound1.map((elem, idx) => {
          return (
            <div
              className={`${elem}`}
              data-index={idx}
              key={idx}
              onClick={this.toggleSwitch}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sound1: state.sounds.sound1
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSound: (soundId, arrIndex) => dispatch(updateSound(soundId, arrIndex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentRow);
