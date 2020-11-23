import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/contacts.css';

import { Main } from './Main';
import ReactDOM from 'react-dom';
import React from 'react';

export class App {
  constructor() {
    this.render();
  }

  private render(): void {
    ReactDOM.render(
      React.createElement(Main, { app: this }),
      document.getElementById('app') || document.createElement('div'),
    );
  }
}

new App();
