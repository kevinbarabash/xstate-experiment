import { Machine, assign } from 'xstate';
import { createModel } from '@xstate/test';

export const counterMachine = Machine({
  initial: 'active',
  context: { count: 5 },
  states: {
    active: {
      on: {
        DEC: {
            actions: assign({
                count: ctx => Math.max(ctx.count - 1, 0),
            })
        },
        INC: {
          actions: assign({
              count: ctx => Math.min(ctx.count + 1, 10),
          })
        },
      },
      meta: {
          test: async (wrapper, state) => {
              // `test` must get called before and after the event
              // before the event state.history is undefined
            if (state.event.type === "DEC" && state.history) {
                expect(state.context.count).toEqual(
                    state.history.context.count - 1
                );
            } else if (state.event.type === "INC" && state.history) {
                expect(state.context.count).toEqual(
                    state.history.context.count + 1
                );
            }
          },
      },
    }
  }
});

export const counterModel = createModel(counterMachine).withEvents({
    INC: {
      exec: async wrapper => {
        await wrapper.find("#inc").simulate("click");
      }
    },
    DEC: {
      exec: async wrapper => {
        await wrapper.find("#dec").simulate("click");
      }
    },
  });
  