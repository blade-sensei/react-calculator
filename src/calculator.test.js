import Calculator from './calculator';
test('renders learn react link', () => {
  const calculator = new Calculator();
  const result = calculator.calculationExpression('3*2+1');
  expect(result).toEqual(2); 
});
