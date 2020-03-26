import React from 'react';

class CalculatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'number',
      color: 'red',
      value: '1',
    }
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  render() {
    return (
    <button onClick={ this.onButtonClick }> { this.state.value } </button>
    )
  }

  onButtonClick() {
    this.props.onUserInput(this.state);
  }
}

export default CalculatorButton;