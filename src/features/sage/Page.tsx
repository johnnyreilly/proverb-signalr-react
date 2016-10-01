import React from "react";
import SageStore, { SageState } from "../../shared/stores/sageStore";
import * as SageActions from "../../shared/actions/sageActions";
import SageThumbnail from "./SageThumbnail";
import Loading from "../../shared/components/Loading";

class App extends React.Component<any, SageState> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: any) {
    super(props);
    this.state = SageStore.getState();
  }

  componentWillMount() {
    this.eventSubscription = SageStore.addChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(SageStore.getState());
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  componentDidMount() {
    if (!this.state.isInitialised) {
      SageActions.loadSages();
    }
  }

  render() {
    const { isInitialised, sages } = this.state;

    const content = isInitialised
      ? [...sages.values()].map((sage, index) => <SageThumbnail key={index} sage={sage} />)
      : <Loading/>;

    return (
      <div className="container">
        <h2>Sages</h2>

        { content }
      </div>
    );
  }
}

export default App;
