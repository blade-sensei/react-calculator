import React from 'react';
import CalculatorButton from './CalculatorButton';
import Calculator from './calculator';

class CalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.calculator = new Calculator();
    this.state = {
      calculationExpression: '',
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
    } else if (type === 'clear') {
      
      this.clear(value);

    } else if (type === 'result') {
      const normalizedExpression = this.state.calculationExpression.replace('x', '*');
      let result = this.calculator.calculationExpression(normalizedExpression);
      result = result.toString()
      this.setState({ calculationExpression: result });
    }
  }

  clear(typeOfClear) {
    if (typeOfClear === 'AC') {
      return this.setState({ calculationExpression: ''});
    } 
    const removeLastEntry = this.state.calculationExpression.substr(0, this.state.calculationExpression.length -1);
    this.setState({
      calculationExpression: removeLastEntry
    })
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
      <CalculatorButton value='AC' type='clear' onUserInput={this.handleUserInput} />
      <CalculatorButton value='C' type='clear' onUserInput={this.handleUserInput} />
      <CalculatorButton value='1' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='2' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='3' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='4' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='5' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='6' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='7' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='8' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='9' type='number' onUserInput={this.handleUserInput} />
      <CalculatorButton value='+' type='operator' onUserInput={this.handleUserInput} />
      <CalculatorButton value='-' type='operator' onUserInput={this.handleUserInput} />
      <CalculatorButton value='x' type='operator' onUserInput={this.handleUserInput} />
      <CalculatorButton value='/' type='operator' onUserInput={this.handleUserInput} />
      <CalculatorButton value='=' type='result' onUserInput={this.handleUserInput} />
      </div>
    )
  }
}

export default CalculatorComponent;
