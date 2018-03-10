import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/store';
import Container from './containers/container';

const store = configureStore();

try {
  let e = document.createElement('div')
  e.className = 'root'
  ReactDOM.render(
    <Provider store={store}>
      <Container />
    </Provider>,
    document.body.appendChild(e)
  );
} catch(e) {
  throw new Error("RenderFailed");
}
