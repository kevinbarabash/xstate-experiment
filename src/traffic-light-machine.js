import { Machine, assign, sendParent, actions } from "xstate";
const { log } = actions;

export const trafficLightMachine = Machine({
  id: "traffic-light",
  initial: "green",
  context: {
    startTime: 0,
  },
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
        },
        cars: {
          after: {
            1800: "#green", // if a car has waited more than 1.8s, switch to green
          }
        }
      },
      after: {
        6000: "green", // change after 6s regardless of whether there are cars or not
      },
    },
    yellow: {
      id: "yellow",
      initial: "active",
      states: {
        active: {}, // no internal transitions since we always wait the same time
      },
      after: {
        1800: "red",
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
        },
        // Once we're in this state we rely on the "after" on the "green"
        // state which will unconditionally move us to "yellow" after 5s.
        cars: {},
      },
      after: {
        5000: "yellow", // waiting with traffic, since "after" timer gets reset
      },
    },
  },
});
