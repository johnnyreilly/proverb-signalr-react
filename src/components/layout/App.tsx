import React from "react";
import navbarInstance from "./NavBar";
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
        { navbarInstance }
        { this.props.children }
      </div>
    );
  }
}

export default App;
