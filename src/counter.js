import * as React from 'react';
import { Machine, interpret } from 'xstate';

import { counterMachine } from './counter-machine';

class Counter extends React.Component {
  state = {
    current: counterMachine.initialState
  };

  service = interpret(counterMachine).onTransition(current =>
    this.setState({ current })
  );

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  handleInc = () => {
    this.service.send("INC");
  };

  handleDec = () => {
    this.service.send("DEC");
  };

  render() {
    const { current } = this.state;
    const { send } = this.service;

    return (
      <div>
        <h1>{current.context.count}</h1>
        <button onClick={this.handleInc} id="inc">
          INC
        </button>
        <button onClick={this.handleDec} id="dec">
          DEC
        </button>
      </div>
    );
  }
}

export default Counter;
