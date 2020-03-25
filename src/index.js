import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { increment: 1 };
    this.onClick = this.onClick.bind(this);
    
  }
  render() {
    return (
      <div>
        <div> increate counter: { this.state.increment } </div>
        <button onClick={this.onClick} > Counter </button>
        <Welcome increased={this.state.increment} />
      </div>
    );

  }

  onClick() {
    setTimeout(() => {
      this.setState({
        increment: this.state.increment + 1,
      })
    }, 2000);
  }
}
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 10 };

    this.onClick = this.onClick.bind(this);
    this.onClickBeffore = this.onClickBeffore.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Bonjour, { this.props.name } </h1>
        <div> counter: { this.state.counter } </div>
        <div> increased: { this.props.increased } </div>
        <div> total: { this.state.counter + this.props.increased} </div>
        <button onClick={this.onClick} > Counter </button>
        <button onClick={this.onClickBeffore} > Before </button>
      </div>
    );

  }

  onClick() {
      this.setState((prev, props) => {
        return {
        counter: props.increased + prev.counter,
      }});
  }

  onClickBeffore() {
    this.setState({ counter: 5 })
  }

}

const element = <Counter/>

ReactDOM.render(
  element,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//TODO: Test async calls of setState() and childs with props. button increase
//TODO button parent that change sum