import React from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplayer from './CalculatorDisplayer';
import Calculator from '../services/calculator';
import './Calculator.css';
import { inputs, operators } from '../constants'

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

    switch(type) {
      case inputs.NUMBER:
        if (this.state.calculationExpression === '0') {
          return this.setState({
          calculationExpression: value,
        });
        }
        this.append(value);
        break;

      case inputs.OPERATOR: 
        if (lastUserInput.type === inputs.NUMBER) {
          this.append(value);
        }
        break;

      case inputs.SEPARATOR:
        if (lastUserInput.type === inputs.NUMBER) {
          const lastNumber = this.getLastNumberInExpression();
          if (!this.isFloat(lastNumber)) {
            this.append(value);
          }
        }
        break;

      case inputs.CLEAR:
        this.clearExpression(value);
        break;

      case inputs.RESULT: 
        const normalizedExpression = this.normalizeToCalculation(this.state.calculationExpression);
        let result = this.calculator.calculationExpression(normalizedExpression);
        result = result.toString();
        result = this.normalizeToDisplay(result);
        this.setState({ calculationExpression: result });
        break;

      default:
        break;
    }
  }

  append(input) {
    this.setState({
      calculationExpression: this.state.calculationExpression + input,
    });
  }

  isFloat(stringNumber) {
    return stringNumber.includes(',');
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

  getLastNumberInExpression() {
    const expression = this.state.calculationExpression.split('');
    const rightLimit = expression.length;
    let leftLimit = 0;
    for (let termIndex = rightLimit; termIndex >= 0; termIndex--) {
      const term = expression[termIndex];
      if (this.isOperator(term)) {
        leftLimit  = termIndex + 1;
        break;
      }
    }
    const number = expression.slice(leftLimit, rightLimit + 1);
    return number.join('');
  }

  clearExpression(typeOfClear) {
    if (typeOfClear === inputs.CLEAR_ALL) {
      return this.resetExpression();
    } 
    return this.removeLastUserInput();
  }

  removeLastUserInput() {
    this.setState({
      calculationExpression: this.state.calculationExpression.slice(0, -1)
    })
  }

  resetExpression() {
    this.setState({ calculationExpression: '0'});
  }

  isOperator(term) {
    return Object.values(operators).includes(term)
  }

  lastUserInput() {
    const lastInput = this.state.calculationExpression.slice(-1);
    let type = '';
    if (!lastInput) return { type, lastInput } 
    if (!isNaN(Number(lastInput))) {
      type = inputs.NUMBER
    } else if (lastInput === ',') {
      type = inputs.SEPARATOR;
    } else {
      type = inputs.OPERATOR;
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
