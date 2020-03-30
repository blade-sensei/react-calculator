import React from 'react';
import './CalculatorDisplayer.css'

class CalculatorDisplayer extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="displayer">
        <span className="displayer-text">
          { this.props.expression }
        </span>
      </div>
    )
  }

}

export default CalculatorDisplayer;