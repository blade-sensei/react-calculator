import React from 'react';
import './CalculatorButton.css'

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
    const className = this.getClassName();

    return (
    <button onClick={ this.onButtonClick }  className={ className }> { this.state.value } </button>
    )
  }

  onButtonClick() {
    this.props.onUserInput(this.state);
  }

  isZeroButton() {
    return (this.state.value === '0');
  }

  getClassName () {
    let className = this.state.type;
    if (this.isZeroButton()) {
      className = `${className} zero`
    } else if (this.state.value === '/') {
      className = `${className} divide`;
    }
    return className;

  }
}

export default CalculatorButton;