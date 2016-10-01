import React from "react";
import { Sage } from "../../shared/domain/dtos/sage";
import { Link } from "react-router";

interface Props {
  sage: Sage;
}

export default class SageThumbnail extends React.Component<Props, any> {
  static propTypes: React.ValidationMap<Props> = {
    targetOfGreeting: React.PropTypes.string.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { sage } = this.props;
    return (
      <div className="col-md-2 col-xs-4">
        <Link to={ `/sages/${ sage.id }` } className="thumbnail">
            <div className="text-center text-info min-height-120">
              <i className="fa fa-user fa-5x" />
              <h5>{ sage.name }</h5>
            </div>
          </Link>
      </div>
    );
  }
}
