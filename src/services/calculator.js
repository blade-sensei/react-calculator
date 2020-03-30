import { operators } from '../constants';
class Calculator {

  calculationExpression(calculExpression) {
    let result = calculExpression.split('');
    while (!this.isLastResult(result)) {
      const terms = this.priorityOperationTerms(result)
      let resultCalcul = this.calculation(terms.operands, terms.operator);
      resultCalcul = resultCalcul.toString();
      const deltaDeleteIndex = (terms.limitIndexes.end - terms.limitIndexes.start) + 1;
      result.splice(terms.limitIndexes.start, deltaDeleteIndex, resultCalcul);
    }
    
    return Number(result[0]);
  }

  isLastResult(expression) {
    return expression.length === 1;
  }

  calculation(operands, operator) {
    const [firstOperand, secondOperand] = operands;
    if (operator === operators.MULTIPLICATION) {
      return this.multiplication(firstOperand, secondOperand);
    } else if (operator === operators.DIVISION) {
      return this.division(firstOperand, secondOperand);
    } else if (operator === operators.ADDITION) {
      return this.addition(firstOperand, secondOperand);
    } 
    return this.subtraction(firstOperand, secondOperand);
  }

  //return limitIndexes to know where to replace in 
  //current string expressionn, priority operation by futur priority result
  priorityOperationTerms(expression) {
    let firstOperatorFound = false;
    let indexPriorityOperator;
    let operands = [];

    for (let [index, term] of expression.entries()) {
      if (this.isOperator(term)) {
        if (this.isPriorityOperator(term)) {
          indexPriorityOperator = index;
          break;
        } if (!firstOperatorFound) {
          indexPriorityOperator = index;
          firstOperatorFound = true;
        }
      }
    }
    const [operandLeft, operandLeftIndex ] = this.getLeftOperand(expression, indexPriorityOperator);
    const [operandRight, operandRightIndex]  = this.getRightOperand(expression, indexPriorityOperator);
    operands = [operandLeft, operandRight];
    const terms = {
      operator: expression[indexPriorityOperator],
      operands,
      limitIndexes: {
        start: operandLeftIndex,
        end: operandRightIndex,
      }
    }
    return terms;

  }

  getRightOperand(expression, index) {
    let rightLimit = expression.length;
    let leftLimit = index + 1;
    for (let endIndex = leftLimit; endIndex < expression.length; endIndex++) {
      const term = expression[endIndex];
      if (this.isOperator(term)) {
        rightLimit  = endIndex;
        break;
      }
    }
    let number = expression.slice(leftLimit, rightLimit);
    number = number.join('');
    number = Number(number);
    return [number, rightLimit - 1]
  }

  getLeftOperand(expression, index) {
    let leftLimit = 0;
    for (let endIndex = index - 1; endIndex >= 0; endIndex--) {
      const term = expression[endIndex];
      if (this.isOperator(term)) {
        leftLimit  = endIndex + 1;
        break;
      }
    }
    let number = expression.slice(leftLimit, index);
    number = number.join('');
    number = Number(number);
    return [number, leftLimit]
  }

  isPriorityOperator(operator) {
    return (
      operator ===  operators.MULTIPLICATION ||
      operator === operators.DIVISION
    );
  }

  isOperator(term) {
    return Object.values(operators).includes(term)
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
