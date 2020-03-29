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
      if (this.state.calculationExpression === '0') {
        this.setState({
          calculationExpression: value,
        })
      } else {
        this.setState({
          calculationExpression: this.state.calculationExpression + value,
        })
      }
    } else if (type === 'operator') {
      if (lastUserInput.type === 'number') {
        this.setState({
          calculationExpression: this.state.calculationExpression + value,
        })
      }
    } else if (type === 'separator') {
      if (lastUserInput.type === 'number') {
        const fullNumber = this.getFullNumber();
        if (Number.isInteger(fullNumber)) {
          this.setState({
            calculationExpression: this.state.calculationExpression + value,
          })
        }
      }
    } else if (type === 'clear') {
      this.clear(value);
    } else if (type === 'result') {

      const normalizedExpression = this.normalizeToCalculation(this.state.calculationExpression);
      let result = this.calculator.calculationExpression(normalizedExpression);
      result = result.toString()
      result = this.normalizeToDisplay(result);
      this.setState({ calculationExpression: result });
    }
  }
  
  normalizeToCalculation(expression) {
    let expressionNormalized = expression;
    const regexMultiply = /x/gi;
    const regexSeparator = /,/gi;
    expressionNormalized = expressionNormalized.replace(regexMultiply, '*');
    expressionNormalized = expressionNormalized.replace(regexSeparator, '.');
    return expressionNormalized;
  }

  normalizeToDisplay(expression) {
    let expressionNormalized = expression;
    expressionNormalized = expressionNormalized.replace('.', ',');
    return expressionNormalized;
  }

  getFullNumber() {
    const expression = this.state.calculationExpression.split('');
    const start = expression.length - 1
    let indexEnd = 0;
    for (let endIndex = start; endIndex >= 0; endIndex--) {
      const term = expression[endIndex];
      if (this.isOperator(term)) {
        indexEnd  = endIndex + 1;
        break;
      }
    }
    let number = expression.slice(indexEnd, start + 1);
    number = number.join('');
    number = number.replace(',', '.');
    number = Number(number);

    return number
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


  isOperator(term) {
    return  (
      term === '+' ||
      term === '-' ||
      term === '*' ||
      term === '/'
    )
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
      <CalculatorButton value=',' type='separator' onUserInput={this.handleUserInput} />
      <CalculatorButton value='0' type='number' onUserInput={this.handleUserInput} />
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
