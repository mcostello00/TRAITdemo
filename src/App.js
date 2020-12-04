import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/contacts.css';
import './styles/site.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import TransitionItem from './components/TransitionItem';

export default class App extends React.Component {
  state = { counter: 0 };
  constructor(props) {
    super(props);
  }

  render() {
    return <TransitionItem />;
  }
}
