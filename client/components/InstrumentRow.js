import React from 'react';

class InstrumentRow extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      data: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    };
    // this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch = event => {
    let idx = event.target.className;
    let newData = [...this.state.data];
    newData[idx] = !newData[idx];
    this.setState({data: newData});
  };

  render() {
    let divArray = [...this.state.data];
    return (
      <div className="row">
        {divArray.map((status, idx) => {
          return <div className={idx} key={idx} onClick={this.toggleSwitch} />;
        })}
      </div>
    );
  }
}

export default InstrumentRow;
