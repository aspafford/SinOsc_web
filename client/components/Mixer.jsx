/*
    ./client/components/Mixer.jsx
*/
import React from 'react';

export default class Mixer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volume: 1};

    this.handleVolume = this.handleVolume.bind(this);
  }

  componentDidMount() {

    let s = {
      synthDef: {
        ugen: "flock.ugen.out",
        bus: [0,1],
        expand: 2,
        sources: {
          id: "mixer",
          ugen: "flock.ugen.in",
          bus: [2,3],
          mul: 0.1,
          expand: 2
        }
      }
    };

    this.synth = flock.synth(s);
  }


  handleVolume(event) {
    this.setState({volume: event.target.value});
    this.synth.input('player.mul', this.state.volume * 0.01);
  }

  render() {
    return (
      <div>
        Mixer
        <input type="range" defaultValue={this.state.volume} onChange={this.handleVolume} />
        <br />
        Volume: {this.state.volume}
      </div>
    );
  }
}