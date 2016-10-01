import React from "react";
import * as TestUtils from "react-addons-test-utils";
import App from "../../../src/features/greeting/Page";
import WhoToGreet from "../../../src/features/greeting/WhoToGreet";
import Greeting from "../../../src/features/greeting/Greeting";
import GreetingStore from "../../../src/shared/stores/GreetingStore";
import GreetingState from "../../../src/shared/types/GreetingState";

describe("App", () => {
  it("renders expected HTML", () => {
    const app = render({ greetings: ["James"], newGreeting: "Benjamin" });
    expect(app).toEqual(
      <div className="container-fluid">
        <h1>Hello People!</h1>

        <WhoToGreet newGreeting={ "Benjamin" } />

        { [
          <Greeting key={ 0 } targetOfGreeting="James" />
        ] }
      </div>
    );
  });

  function render(state: GreetingState) {
    const shallowRenderer = TestUtils.createRenderer();
    spyOn(GreetingStore, "getState").and.returnValue(state);

    shallowRenderer.render(<App />);
    return shallowRenderer.getRenderOutput();
  }
});
