import React from "react";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";
import { connect } from "react-redux";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = stream => {
    if (stream.userId !== this.props.currentUserId || !stream.userId) return;
    return (
      <div className="right floated content">
        <Link to={`streams/edit/${stream.id}`} className="ui button primary">
          EDIT
        </Link>
        <Link to={`streams/delete/${stream.id}`} className="ui button negative">
          DELETE
        </Link>
      </div>
    );
  };

  renderList = () => {
    return this.props.streamList.map(stream => (
      <div className="ui item" key={stream.id}>
        {this.renderAdmin(stream)}
        <i className="large middle aligned icon camera" />
        <Link to={`/streams/${stream.id}`} className="content">
          <div className="header">{stream.title}</div>
          <div className="description">{stream.description}</div>
        </Link>
      </div>
    ));
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Stream</h2>
        <div className="ui relaxed celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streamList: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
