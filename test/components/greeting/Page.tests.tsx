import React from "react";
import * as TestUtils from "react-addons-test-utils";
import App from "../../../src/components/greeting/Page";
import WhoToGreet from "../../../src/components/greeting/WhoToGreet";
import Greeting from "../../../src/components/greeting/Greeting";
import GreetingStore from "../../../src/stores/GreetingStore";
import GreetingState from "../../../src/types/GreetingState";

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
