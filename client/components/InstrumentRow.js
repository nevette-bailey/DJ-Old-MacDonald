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
  }

  render() {
    let divArray = [...this.state.data];
    return (
      <div className="row">
        {divArray.map((div, idx) => {
          return <div className={idx} key={idx} />;
        })}
      </div>
    );
  }
}

export default InstrumentRow;
