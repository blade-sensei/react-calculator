import React from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplayer from './CalculatorDisplayer';
import Calculator from '../services/calculator';
import './Calculator.css';

class CalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.calculator = new Calculator();
    this.state = {
      calculationExpression: '0',
    }
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(userInput) {
    const { type, value } = userInput;
    const lastUserInput = this.lastUserInput();
    if (type === 'number') {
      if (this.state.calculationExpression === '0') {
         return this.setState({
          calculationExpression: value,
        });
      }
      this.setState({
          calculationExpression: this.state.calculationExpression + value,
      });
    } else if (type === 'operator') {
      if (lastUserInput.type === 'number') {
        this.setState({
          calculationExpression: this.state.calculationExpression + value,
        })
      }
    } else if (type === 'separator') {
      if (lastUserInput.type === 'number') {
        const fullNumber = this.getFullNumber();
        if (!fullNumber.includes(',')) {
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
    return number.join('');
  }

  clear(typeOfClear) {
    if (typeOfClear === 'AC') {
      return this.resetExpression();
    } 
    return this.removeLastUserEntry();
  }

  removeLastUserEntry() {
    this.setState({
      calculationExpression: this.state.calculationExpression.slice(0, -1)
    })
  }

  resetExpression() {
    this.setState({ calculationExpression: '0'});
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
      <div className="calculator">
      <div className="displayer-container">
        <CalculatorDisplayer expression={this.state.calculationExpression} />  
      </div>
      <div className="inputs-container">
        <div className="row">
          <CalculatorButton value='AC' type='clear' onUserInput={this.handleUserInput} />
          <CalculatorButton value='' type='disabled' onUserInput={this.handleUserInput} />
          <CalculatorButton value='C' type='clear' onUserInput={this.handleUserInput} />
          <CalculatorButton value='/' type='operator' onUserInput={this.handleUserInput} />
        </div>
        <div className="row">
          <CalculatorButton value='7' type='number' onUserInput={this.handleUserInput} />
          <CalculatorButton value='8' type='number' onUserInput={this.handleUserInput} />
          <CalculatorButton value='9' type='number' onUserInput={this.handleUserInput} />
          <CalculatorButton value='x' type='operator' onUserInput={this.handleUserInput} />
        </div>
        <div className="row">
        <CalculatorButton value='4' type='number' onUserInput={this.handleUserInput} />
        <CalculatorButton value='5' type='number' onUserInput={this.handleUserInput} />
        <CalculatorButton value='6' type='number' onUserInput={this.handleUserInput} />
        <CalculatorButton value='-' type='operator' onUserInput={this.handleUserInput} />
        
        </div>

        <div className="row">
        <CalculatorButton value='1' type='number' onUserInput={this.handleUserInput} />
        <CalculatorButton value='2' type='number' onUserInput={this.handleUserInput} />
        <CalculatorButton value='3' type='number' onUserInput={this.handleUserInput} />
        
        
        <CalculatorButton value='+' type='operator' onUserInput={this.handleUserInput} /> 
        </div>

        <div className="row">
        <CalculatorButton value='0' type='number' onUserInput={this.handleUserInput} />
        <CalculatorButton value=',' type='separator' onUserInput={this.handleUserInput} />
        <CalculatorButton value='=' type='result' onUserInput={this.handleUserInput}/>
        </div>
        
      </div>
      </div>
    )
  }
}

export default CalculatorComponent;