class Calculator {

  calculationExpression(calculExpression) {
    let result = calculExpression.split('');

    while (result.length !== 1) {

      const terms = this.getTerms(result) 
      let resultCalcul = this.calculation(terms.operands, terms.operator);
      resultCalcul = resultCalcul.toString();
      const deltaDeleteIndex = (terms.limitIndexes.end - terms.limitIndexes.start) + 1;
      result.splice(terms.limitIndexes.start, deltaDeleteIndex, resultCalcul);
    }

    return Number(result[0]);
  }

  calculation(operands, operator) {
    const [firstOperand, secondOperand] = operands;
    if (operator === '*') {
      return this.multiplication(firstOperand, secondOperand);
    } else if (operator === '/') {
      return this.division(firstOperand, secondOperand);
    } else if (operator === '+') {
      return this.addition(firstOperand, secondOperand);
    } 
    return this.subtraction(firstOperand, secondOperand);
  }

  getTerms(expression) {
    let firstOperatorFound = false;
    let indexOperator;
    let operands = [];

    for (let [index, term] of expression.entries()) {
      if (this.isOperator(term)) {
        if (this.isPriorityOperator(term)) {
          indexOperator = index;
          break;
        } else if (!firstOperatorFound) {
          indexOperator = index;
          firstOperatorFound = true;
        }
      }
    }
    const [operandLeft, operandLeftIndex ] = this.getLeftOperand(expression, indexOperator);
    const [operandRight, operandRightIndex]  = this.getRightOperand(expression, indexOperator);
    operands = [operandLeft, operandRight];
    const terms = {
      operator: expression[indexOperator],
      operands,
      limitIndexes: {
        start: operandLeftIndex,
        end: operandRightIndex,
      }
    }
    return terms;

  }

  getRightOperand(expression, index) {
    let indexEnd = expression.length;
    let indexStart = index + 1;
    for (let endIndex = indexStart; endIndex < expression.length; endIndex++) {
      const term = expression[endIndex];
      if (this.isOperator(term)) {
        indexEnd  = endIndex;
        break;
      }
    }
    let number = expression.slice(indexStart, indexEnd);
    number = number.join('');
    number = Number(number);
    return [number, indexEnd - 1]
  }

  getLeftOperand(expression, index) {
    let indexEnd = 0;
    for (let endIndex = index - 1; endIndex >= 0; endIndex--) {
      const term = expression[endIndex];
      if (this.isOperator(term)) {
        indexEnd  = endIndex + 1;
        break;
      }
    }
    let number = expression.slice(indexEnd, index);
    number = number.join('');
    number = Number(number);

    return [number, indexEnd]
  }

  isPriorityOperator(operator) {
    return (operator === '*' || operator === '/');
  }

  isOperator(term) {
    return  (
      term === '+' ||
      term === '-' ||
      term === '*' ||
      term === '/'
    )
  }

  addition(first, second) {
    return (first + second).toFixed(2);
  }

  subtraction(first, second) {
    return (first - second).toFixed(2);
  }

  multiplication(first, second) {
    return (first * second).toFixed(2);
  }

  division(first, second) {
    return (first / second).toFixed(2);
  }
  
}

export default Calculator;
