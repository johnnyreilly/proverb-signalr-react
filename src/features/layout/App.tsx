import React from "react";
import TopNav from "./TopNav";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{
}, {}> { }

class App extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TopNav path={ this.props.location.pathname } routes={ this.props.routes } />
        { this.props.children }
      </div>
    );
  }
}

export default App;
