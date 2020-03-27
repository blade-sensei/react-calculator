import React from 'react';

class CalculatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      color: 'red',
      value: this.props.value,
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