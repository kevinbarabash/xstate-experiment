import * as React from "react";
import {mount} from "enzyme";

import {trafficLightModel} from "../traffic-light-machine";
import TrafficLight from "../traffic-light";

describe('TrafficLight', () => {
  describe("shortest", () => {
    const shortTestPlans = trafficLightModel.getShortestPathPlans();

    shortTestPlans.forEach(plan => {
      describe(plan.description, () => {
        plan.paths.forEach(path => {
          it(path.description, async () => {
            const wrapper = mount(<TrafficLight />);
  
            await path.test(wrapper);

            wrapper.unmount();
          });
        });
      });
    });  
  });

  describe("simple", () => {
    const simpleTestPlans = trafficLightModel.getSimplePathPlans();

    simpleTestPlans.forEach(plan => {
      describe(plan.description, () => {
        plan.paths.forEach(path => {
          it(path.description, async () => {
            const wrapper = mount(<TrafficLight />);
  
            await path.test(wrapper);
          });
        });
      });
    });  
  });

  it('should have full coverage', () => {
    return trafficLightModel.testCoverage();
  });

  describe("enzyme", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("should start in green", () => {
      const wrapper = mount(<TrafficLight/>);

      const state = wrapper.state();
      expect(state.current.value).toEqual({green: "waiting_for_cars"});
    });

    it("should transition to yellow after 2s of green", () => {
      const wrapper = mount(<TrafficLight/>);

      jest.advanceTimersByTime(1999);
      expect(wrapper.state().current.value).toEqual({green: "waiting_for_cars"});

      jest.advanceTimersByTime(1);
      expect(wrapper.state().current.value).toEqual({yellow: "active"});
    });

    it("should transition to yellow after 6s of green", () => {
      const wrapper = mount(<TrafficLight/>);

      jest.advanceTimersByTime(1999);
      expect(wrapper.state().current.value).toEqual({green: "waiting_for_cars"});

      jest.advanceTimersByTime(1);
      expect(wrapper.state().current.value).toEqual({yellow: "active"});
    });

    it("should transition to red after 1.8s of yellow", () => {
      const wrapper = mount(<TrafficLight/>);

      jest.advanceTimersByTime(2000);
      jest.advanceTimersByTime(1799);

      expect(wrapper.state().current.value).toEqual({yellow: "active"});

      jest.advanceTimersByTime(1);
      expect(wrapper.state().current.value).toEqual({red: "no_cars"});
    });

    it("should transition back to green after 6s of red", () => {
      const wrapper = mount(<TrafficLight/>);

      jest.advanceTimersByTime(2000);
      jest.advanceTimersByTime(1800);
      jest.advanceTimersByTime(5999);

      expect(wrapper.state().current.value).toEqual({red: "no_cars"});

      jest.advanceTimersByTime(1);

      expect(wrapper.state().current.value).toEqual({green: "waiting_for_cars"});
    });
  });
});
