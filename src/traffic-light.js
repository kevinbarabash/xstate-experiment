import * as React from 'react';
import { Machine, interpret } from 'xstate';

import { trafficLightMachine } from './traffic-light-machine';

class Toggle extends React.Component {
  state = {
    current: trafficLightMachine.initialState
  };

  service = interpret(trafficLightMachine).onTransition(current =>
    this.setState({ current })
  );

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render() {
    const { current } = this.state;
    const { send } = this.service;

    return (
      <div>
        <h1>Traffice Light</h1>
        <div>Red: {current.value.red}</div>
        <div>Yellow: {current.value.yellow}</div>
        <div>Green: {current.value.green}</div>
        <button onClick={() => send('RESET')}>
          RESET
        </button>
        <button onClick={() => send('SENSE_CAR')}>
          SENSE_CAR
        </button>
      </div>
    );
  }
}

export default Toggle;
