import * as React from "react";
import {mount} from "enzyme";

import {toggleModel} from "../toggle-machine";
import Toggle from "../toggle";

describe('toggle', () => {
  const testPlans = toggleModel.getShortestPathPlans();

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const wrapper = mount(<Toggle />);

          await path.test(wrapper);
        });
      });
    });
  });

  it('should have full coverage', () => {
    return toggleModel.testCoverage();
  });
});
