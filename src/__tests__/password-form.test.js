import * as React from "react";
import {mount} from "enzyme";
import { interpret } from "xstate";

import {passwordFormModel, passwordFormMachine} from "../password-form-machine";
import PasswordForm from "../password-form";

describe('PasswordForm', () => {
  const testPlans = passwordFormModel.getShortestPathPlans();

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const wrapper = mount(<PasswordForm />);

          await path.test(wrapper);

          wrapper.unmount();
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

  describe("service", () => {
    it("starts in the initial state", () => {
      const service = interpret(passwordFormMachine);
      service.start();
      
      expect(service.state.value).toEqual({"existingPassword": "start", "newPasswords": "start"});
    });

    it("only setting one password will result in 'not_equal' state", () => {
      const service = interpret(passwordFormMachine);
      service.start();

      service.send("FIRST_PASSWORD", {value: "abc"});
      
      expect(service.state.value.newPasswords).toEqual("not_equal");
    });

    it("setting both passwords to '' will result in 'empty' state", () => {
      const service = interpret(passwordFormMachine);
      service.start();

      service.send("FIRST_PASSWORD", {value: ""});
      service.send("SECOND_PASSWORD", {value: ""});

      expect(service.state.value.newPasswords).toEqual("empty");
    });

    it("setting both passwords to he same value is 'valid'", () => {
      const service = interpret(passwordFormMachine);
      service.start();

      service.send("FIRST_PASSWORD", {value: "123"});
      service.send("SECOND_PASSWORD", {value: "123"});

      expect(service.state.value.newPasswords).toEqual("valid");
    });
  });
});
