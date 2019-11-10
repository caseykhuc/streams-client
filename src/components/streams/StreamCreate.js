import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  render() {
    /* console.log(this.props); */
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.props.createStream} />
      </div>
    );
  }
}
export default connect(
  null,
  { createStream }
)(StreamCreate);
