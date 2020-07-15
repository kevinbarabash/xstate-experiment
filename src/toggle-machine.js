import { Machine } from 'xstate';
import { createModel } from '@xstate/test';

// This machine is completely decoupled from React
export const toggleMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }, // This is the next state
      meta: {
        test: async wrapper => {
          // The current state is inactive so the button is Off
          expect(wrapper.text()).toEqual("Off");
        }
      },
    },
    active: {
      on: { TOGGLE: 'inactive' }, // This is the next state
      meta: {
        test: async wrapper => {
          // The current state is active so the button is Off
          expect(wrapper.text()).toEqual("On");
        }
      },
    }
  }
});

export const toggleModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: async wrapper => {
      await wrapper.find("button").simulate("click");
    }
  }
});
