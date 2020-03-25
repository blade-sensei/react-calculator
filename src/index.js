import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function Welcome(props) {
  return <h1>Bonjour, { props.name } </h1>
}

const element = <Welcome name="Sara" />

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