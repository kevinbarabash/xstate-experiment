// @flow
import { Machine, assign } from "xstate";
import {createModel} from "@xstate/test";

// TODO: check that the new passwords don't match the existing password

// We define these transitions outside of the machine so that they can be
// reused.  This is useful since we want to respond to change to the various
// passwords when we're in a number of different states.
const existingTransitions = {
  EXISTING_PASSWORD: [
    {
      target: "check_existing",
      actions: assign({ existing: (ctx, evt) => evt.value }),
    },
  ],
};

const passwordTransitions = {
  FIRST_PASSWORD: [
    {
      target: "check_passwords",
      actions: assign({
        first: (ctx, evt) => evt.value,
      }),
    },
  ],
  SECOND_PASSWORD: [
    {
      target: "check_passwords",
      actions: assign({
        second: (ctx, evt) => evt.value,
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
            meta: {
              // test methods must be present in order for coverage to be reported
              test: async wrapper => {
                // TBD
              }
            },
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
            meta: {
              test: async wrapper => {
                expect(wrapper).toIncludeText("Existing password can't be empty")
              }
            },
          },
          valid: {
            on: existingTransitions,
            meta: {
              test: async wrapper => {
                expect(wrapper).toIncludeText("Existing password is valid")
              }
            },
          },
        },
      },
      newPasswords: {
        initial: "start",
        states: {
          start: {
            on: passwordTransitions,
            meta: {
              test: async wrapper => {
                // TBD
              }
            },
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
            meta: {
              test: async wrapper => {
                expect(wrapper).toIncludeText("Passwords are valid")
              }
            },
          },
          not_equal: {
            on: passwordTransitions,
            meta: {
              test: async wrapper => {
                expect(wrapper).toIncludeText("New passwords don't match")
              }
            },
          },
          empty: {
            on: passwordTransitions,
            meta: {
              test: async wrapper => {
                expect(wrapper).toIncludeText("New passwords can't be empty")
              }
            },
          },
        },
      },
    },
  },
);

export const passwordFormModel = createModel(passwordFormMachine).withEvents({
  EXISTING_PASSWORD: {
    exec: async (wrapper, event) => {
      await wrapper.find("input#existing").simulate("change", {
        target: {value: event.value},
      });
    },
    cases: [{value: ""}, {value: "abc"}],
  },
  FIRST_PASSWORD: {
    exec: async (wrapper, event) => {
      await wrapper.find("input#first").simulate("change", {
        target: {value: event.value},
      });
    },
    cases: [{value: ""}, {value: "123"}],
  },
  SECOND_PASSWORD: {
    exec: async (wrapper, event) => {
      await wrapper.find("input#second").simulate("change", {
        target: {value: event.value},
      });
    },
    cases: [{value: ""}, {value: "123"}],
  },
});
