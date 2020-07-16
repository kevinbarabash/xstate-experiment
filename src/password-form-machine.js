// @flow
import { Machine, assign } from "xstate";
// import {createModel} from "@xstate/test";

// We define these transitions outside of the machine so that they can be
// reused.  This is useful since we want to respond to change to the various
// passwords when we're in a number of different states.
const existingTransitions = {
  EXISTING_PASSWORD: [
    {
      target: "check_existing",
      actions: assign({ existing: (ctx, evt) => (ctx.existing = evt.value) }),
    },
  ],
};

const passwordTransitions = {
  FIRST_PASSWORD: [
    {
      target: "check_passwords",
      actions: assign({
        first: (ctx, evt) => (ctx.first = evt.value),
      }),
    },
  ],
  SECOND_PASSWORD: [
    {
      target: "check_passwords",
      actions: assign({
        second: (ctx, evt) => (ctx.second = evt.value),
      }),
    },
  ],
};

// This machine is completely decoupled from React
export const passwordFormMachine = Machine(
  {
    id: "passwordForm",
    type: "parallel",
    context: {
      existing: "",
      first: "",
      second: "",
    },
    states: {
      existingPassword: {
        initial: "start",
        states: {
          start: {
            on: existingTransitions,
          },
          check_existing: {
            on: {
              "": [
                {
                  target: "empty",
                  cond: (ctx) => ctx.existing === "",
                },
                {
                  target: "valid",
                  // no condition is necessary since we check the condition for
                  // the empty" state transition first
                },
              ],
            },
          },
          empty: {
            on: existingTransitions,
          },
          valid: {
            on: existingTransitions,
          },
        },
      },
      newPasswords: {
        initial: "start",
        states: {
          start: {
            on: passwordTransitions,
          },
          check_passwords: {
            on: {
              // This is a transient transition.  This gets fired immediately
              // after we transition to the "check_passwords" state.  This lets
              // us update the context in "passwordTransitions" and then do
              // some sort of validation on the values in the context.
              "": [
                // Order matters here.  We put the "valid" check last since
                // it only checks if the passwords are equal.  We want to avoid
                // have two empty passwords after the user starts typing.  The
                // "empty" state check takes care of that.
                {
                  target: "not_equal",
                  cond: (ctx) => ctx.first !== ctx.second,
                },
                {
                  target: "empty",
                  cond: (ctx) => ctx.first === "" || ctx.second === "",
                },
                {
                  target: "valid",
                  cond: (ctx) => ctx.first === ctx.second,
                },
              ],
            },
          },
          valid: {
            on: passwordTransitions,
          },
          not_equal: {
            on: passwordTransitions,
          },
          empty: {
            on: passwordTransitions,
          },
        },
      },
    },
  },
  {
    actions: {},
    guards: {},
  }
);

// export const toggleModel = createModel(toggleMachine).withEvents({
//     TOGGLE: {
//         exec: async wrapper => {
//             await wrapper.find("button").simulate("click");
//         },
//     },
// });
