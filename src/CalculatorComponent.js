import React from 'react';
import CalculatorButton from './CalculatorButton';

class CalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculationExpression: ''
    }
    this.lastUserInput = this.lastUserInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(userInputButton) {
    const { type, value } = userInputButton;
    const lastUserInput = this.lastUserInput();
    if (type === 'number') {
      this.setState({
        calculationExpression: this.state.calculationExpression + value,
      })
    } else if (type === 'operator') {
      if (lastUserInput.type === 'number') {
        this.setState({
          calculationExpression: this.state.calculationExpression + value,
        })
      }
    } else if (type === 'separator') {
      if (lastUserInput.type === 'number') {
        this.setState({
          calculationExpression: this.state.calculationExpression + value,
        })
      }
    }
  }

  lastUserInput() {
    const lastInput = this.state.calculationExpression.slice(-1);
    let type = 'null';
    if (!lastInput) {
      return {
        type,
        lastInput,
      }
    } 
    if (!isNaN(Number(lastInput))) {
      type = 'number'
    } else if (lastInput === ',') {
      type = 'separator';
    } else {
      type = 'operator';
    }
    return {
      type,
      lastInput,
    }
  }

  render() {
    return (
      <div>
      { this.state.calculationExpression }
      <CalculatorButton value='1' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='2' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='+' type='operator' onUserInput={this.handleUserInput} />
      <CalculatorButton value=',' type='separator' onUserInput={this.handleUserInput} />
      </div>
    )
  }
}

export default CalculatorComponent;