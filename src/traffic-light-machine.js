import { Machine, assign, sendParent, actions } from "xstate";
import { createModel } from '@xstate/test';

const { log } = actions;

export const trafficLightMachine = Machine({
  id: "light",
  initial: "green",
  states: {
    red: {
      initial: "no_cars",
      states: {
        no_cars: {
          on: {
            SENSE_CAR: "cars",
          },
          meta: {test: async wrapper => {}},
        },
        cars: {
          after: {
            1800: "#light.green", // if a car has waited more than 1.8s, switch to green
          },
          meta: {test: async wrapper => {}},
        }
      },
      after: {
        6000: "green", // change after 6s regardless of whether there are cars or not
      },
      meta: {test: async wrapper => {}},
    },
    yellow: {
      initial: "active",
      states: {
        active: {
          meta: {test: async wrapper => {}},
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
      initial: "waiting_for_cars",
      states: {
        waiting_for_cars: {
          after: {
            // If we haven't received a SENSE_CAR event after 2s change lights
            2000: "#light.yellow",
          },
          on: {
            // Once we sense a car, the car drives through the intersection,
            // and we start waiting for the next one.  This will restart the
            // the "after" timer.
            SENSE_CAR: "waiting_for_cars",
          },
          meta: {test: async wrapper => {}},
        },
      },
      after: {
        5000: "yellow", // waiting with traffic, since "after" timer gets reset
      },
      meta: {test: async wrapper => {}},
    },
  },
});

export const trafficLightModel = createModel(trafficLightMachine).withEvents({
  SENSE_CAR: {
    exec: async wrapper => {
      await wrapper.find("button#sense-car").simulate("click");
    }
  },
  "xstate.after(5000)#light.green": {
    exec: async (...args) => {}, // no action necessary
  },
  "xstate.after(1800)#light.yellow": {
    exec: async (...args) => {}, // no action necessary
  },
  "xstate.after(2000)#light.green.waiting_for_cars": {
    exec: async (...args) => {}, // no action necessary
  },
});
