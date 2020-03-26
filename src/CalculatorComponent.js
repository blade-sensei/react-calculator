import React from 'react';
import CalculatorButton from './CalculatorButton';

class CalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculationExpression: ''
    }
  }

  onUserInput(buttonInfo) {
    console.log(buttonInfo);
  }

  render() {
    return (
      <div>
      <CalculatorButton onUserInput={this.onUserInput} />
      </div>
    )
  }
}

export default CalculatorComponent;
