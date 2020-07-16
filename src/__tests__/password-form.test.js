import * as React from "react";
import {mount} from "enzyme";

import {passwordFormModel} from "../password-form-machine";
import PasswordForm from "../password-form";

describe.only('PasswordForm', () => {
  const testPlans = passwordFormModel.getShortestPathPlans();

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const wrapper = mount(<PasswordForm />);

          await path.test(wrapper);
        });
      });
    });
  });

  it('should have full coverage', () => {
    return passwordFormModel.testCoverage({
      // ignore transient check_passwords transitions
      filter: stateNode => !!stateNode.meta,
    });
  });
});
