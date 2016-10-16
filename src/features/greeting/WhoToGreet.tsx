import React from "react";
import * as GreetingActions from "../../shared/actions/GreetingActions";

interface Props {
  newGreeting: string;
}

class WhoToGreet extends React.Component<Props, any> {
  static propTypes: React.ValidationMap<Props> = {
    newGreeting: React.PropTypes.string.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <form role="form">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Who would you like to greet?"
            value={ this.props.newGreeting } style={{ color: "#FF69B4"}}
            onChange={ this._handleNewGreetingChange } />
          <button type="submit" className="btn btn-default btn-primary"
            onClick={ this._onSubmit }
            disabled={ this._preventSubmission }>
            Add greeting
          </button>
        </div>
      </form>
    );
  }

  get _preventSubmission() {
    return !this.props.newGreeting;
  }

  _handleNewGreetingChange = (event: React.FormEvent<any>) => {
    const newGreeting = (event.target as HTMLInputElement).value;
    GreetingActions.newGreetingChanged(newGreeting);
  }

  _onSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (!this._preventSubmission) {
      GreetingActions.addGreeting(this.props.newGreeting);
    }
  }
}

export default WhoToGreet;
