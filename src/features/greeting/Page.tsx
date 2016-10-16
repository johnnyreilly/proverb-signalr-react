import React from "react";
import FBEmitter from "fbemitter";
import GreetingStore from "../../shared/stores/GreetingStore";
import GreetingState from "../../shared/types/GreetingState";
import WhoToGreet from "./WhoToGreet";
import Greeting from "./Greeting";

class App extends React.Component<any, GreetingState> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: any) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentWillMount() {
    this.eventSubscription = GreetingStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  render() {
    const { greetings, newGreeting } = this.state;
    return (
      <div className="container-fluid">
        <h1>Hello People!</h1>

        <WhoToGreet newGreeting={ newGreeting } />

        { greetings.map((g, index) => <Greeting key={ index } targetOfGreeting={ g } />) }
      </div>
    );
  }

  _onChange = () => {
    this.setState(this._getStateFromStores());
  }

  _getStateFromStores() {
    return GreetingStore.getState();
  }
}

export default App;
