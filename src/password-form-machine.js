// @flow
import { Machine, assign } from "xstate";
// import {createModel} from "@xstate/test";

// This machine is completely decoupled from React
export const passwordFormMachine = Machine({
  id: "passwordForm",
  type: "parallel",
  context: { 
    first: "",
    second: "",
  },
  states: {
    existingPassword: {
      initial: "blank",
      states: {
        blank: {
          on: {
            CHECK_EXISTING: [
              {
                target: "valid",
                cond: (context, event) => {
                  // TODO: do we want to update the context with the value?
                  return event.value !== "";
                },
              },
              {
                target: "invalid",
              },
            ],
          },
        },
        invalid: {
          on: {
            CHECK_EXISTING: [
              {
                target: "valid",
                cond: (context, event) => {
                  return true;
                },
              },
            ],
          },
        },
        valid: {
          on: {
            CHECK_EXISTING: [
              {
                target: "invalid",
                cond: (context, event) => {
                  return event.value === "";
                },
              },
            ],
          },
        },
      },
    },
    newPasswords: {
      initial: "blank",
      states: {
        blank: {
          on: {
            CHECK_NEW_PASSWORDS: [
              {
                target: "valid",
                cond: 'passwordsMatch',
                actions: ['updateContext'],
              },
              {
                target: "invalid",
                // cond: 'passwordsMismatch',
                actions: ['updateContext'],
              },
            ],
          },
        },
        invalid: {
          on: {
            CHECK_NEW_PASSWORDS: [
              {
                target: "valid",
                cond: 'passwordsMatch',
                actions: ['updateContext'],
              },
              {
                target: "invalid",
                // cond: 'passwordsMismatch',
                actions: ['updateContext'],
              },
            ],
          },
        },
        valid: {
          on: {
            CHECK_NEW_PASSWORDS: [
              {
                target: "invalid",
                cond: 'passwordsMismatch',
                actions: ['updateContext'],
              },
            ],
          },
        },
      },
    },
    
  },
}, {
  actions: {
    updateContext: assign({
      first: (context, event) => {
        const passwords = {
          ...context,
          ...event,
        };
        return passwords.first;
      },
      second: (context, event) => {
        const passwords = {
          ...context,
          ...event,
        };
        return passwords.second;
      },
    }),
  },
  guards: {
    passwordsMatch: (context, event) => {
      const passwords = {
        ...context,
        ...event,
      };
      return passwords.first === passwords.second;
    },
    passwordsMismatch: (context, event) => {
      const passwords = {
        ...context,
        ...event,
      };
      return passwords.first !== passwords.second;
    },
  }
});

// export const toggleModel = createModel(toggleMachine).withEvents({
//     TOGGLE: {
//         exec: async wrapper => {
//             await wrapper.find("button").simulate("click");
//         },
//     },
// });
