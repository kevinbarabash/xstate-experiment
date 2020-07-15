import * as React from "react";
import {mount} from "enzyme";

import {counterModel} from "../counter-machine";
import Counter from "../counter";

describe('counter', () => {
  const testPlans = counterModel.getSimplePathPlans({
    // filter: state => state.context.count < 3
  });

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const wrapper = mount(<Counter />);

          await path.test(wrapper);
        });
      });
    });
  });

  it('should have full coverage', () => {
    console.log(counterModel.getCoverage());
    return counterModel.testCoverage();
  });
});
