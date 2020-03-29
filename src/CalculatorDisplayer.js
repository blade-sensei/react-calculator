import React from 'react';
import './calculatorDisplayer.css'

class CalculatorDisplayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="displayer">
        <span class="displayer-text">
          { this.props.expression }
        </span>
      </div>
    )
  }

}

export default CalculatorDisplayer;