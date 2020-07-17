import { Machine, assign, sendParent, actions } from "xstate";
import { createModel } from '@xstate/test';

const { log } = actions;

export const trafficLightMachine = Machine({
  id: "traffic-light",
  initial: "green",
  states: {
    red: {
      // "id" is necessary so that "#red" state targets will work
      id: "red",
      initial: "no_cars",
      states: {
        no_cars: {
          on: {
            SENSE_CAR: "cars",
          },
          meta: {
            test: async wrapper => {

            },
          },
        },
        cars: {
          after: {
            1800: "#green", // if a car has waited more than 1.8s, switch to green
          },
          meta: {
            test: async wrapper => {
    
            },
          },
        }
      },
      after: {
        6000: "green", // change after 6s regardless of whether there are cars or not
      },
      meta: {
        test: async wrapper => {

        },
      },
    },
    yellow: {
      id: "yellow",
      initial: "active",
      states: {
        active: {
          meta: {
            test: async wrapper => {
    
            },
          },
        }, // no internal transitions since we always wait the same time
      },
      after: {
        1800: "red",
      },
      meta: {
        test: async wrapper => {

        },
      },
    },
    green: {
      id: "green",
      initial: "no_cars",
      states: {
        no_cars: {
          after: {
            // If we haven't received a SENSE_CAR event after 2s change lights
            2000: "#yellow",
          },
          on: {
            SENSE_CAR: "cars",
          },
          meta: {
            test: async wrapper => {
    
            },
          },
        },
        // Once we're in this state we rely on the "after" on the "green"
        // state which will unconditionally move us to "yellow" after 5s.
        cars: {
          // TODO: transition back to no_cars after the car drives away
          meta: {
            test: async wrapper => {
    
            },
          },
        },
      },
      after: {
        5000: "yellow", // waiting with traffic, since "after" timer gets reset
      },
      meta: {
        test: async wrapper => {

        },
      },
    },
  },
});

export const trafficLightModel = createModel(trafficLightMachine).withEvents({
  SENSE_CAR: {
    exec: async wrapper => {
      await wrapper.find("button#sense-car").simulate("click");
    }
  },
  "xstate.after(5000)#green": {
    exec: async (...args) => {
      // jest.advanceTimersByTime(10000);
    },
  },
  "xstate.after(1800)#yellow": {
    exec: async (...args) => {
      // jest.advanceTimersByTime(3600);
    },
  },
  "xstate.after(2000)#traffic-light.green.no_cars": {
    exec: async (...args) => {
      // jest.advanceTimersByTime(3600);
    },
  },
});
