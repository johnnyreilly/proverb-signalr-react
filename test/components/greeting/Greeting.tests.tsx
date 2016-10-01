import React from "react";
import * as TestUtils from "react-addons-test-utils";
import Greeting from "../../../src/features/greeting/Greeting";
import * as GreetingActions from "../../../src/shared/actions/GreetingActions";

describe("Greeting", () => {
  let handleSelectionChangeSpy: jasmine.Spy;
  beforeEach(() => {
    handleSelectionChangeSpy = jasmine.createSpy("handleSelectionChange");
  });

  it("Array.prototype.includes works", () => {
    const result = [1, 2, 3].includes(2);
    expect(result).toBe(true);
  });

  it("Exponentiation operator works", () => {
    expect(1 ** 2 === Math.pow(1, 2)).toBe(true);
  });

  it("given a targetOfGreeting of \'James\' it renders a p containing a greeting and a remove button", () => {
    const targetOfGreeting = "James";

    const p = render({ targetOfGreeting });
    expect(p.type).toBe("p");
    expect(p.props.children[0]).toBe("Hello ");
    expect(p.props.children[1]).toBe("James");
    expect(p.props.children[2]).toBe("!");

    const [ , , , button ] = p.props.children;

    expect(button.type).toBe("button");
    expect(button.props.className).toBe("btn btn-default btn-danger");
    expect(button.props.children).toBe("Remove");
  });

  it("button onClick triggers an removeGreeting action", () => {
    const targetOfGreeting = "Benjamin";
    const p = render({ targetOfGreeting });
    const [ , , , button ] = p.props.children;
    spyOn(GreetingActions, "removeGreeting");

    button.props.onClick();

    expect(GreetingActions.removeGreeting).toHaveBeenCalledWith(targetOfGreeting);
  });

  function render({ targetOfGreeting }) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Greeting key={ 0 } targetOfGreeting={ targetOfGreeting } />);
    return shallowRenderer.getRenderOutput();
  }
});
