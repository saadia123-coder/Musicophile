import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(event) {
    this.props.onAdd(this.props.Track);
  }
  removeTrack() {
    this.props.onRemove(this.state.Track);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          {" "}
          -{" "}
        </button>
      );
    }
    return (
      <button className="Track-acion" onClick={this.addTrack}>
        {" "}
        +{" "}
      </button>
    );
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-Information">
          <h3>{this.props.Track.name}</h3>
          <p>
            | {this.props.Track.artist} | {this.props.Track.album}
          </p>
          <iframe
            src={"https://open.spotify.com/embed/track/" + this.props.track.id}
            width="300"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="preview"
          />
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default SearchBar;
