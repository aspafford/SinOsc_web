/*
    ./client/components/Synth.jsx
*/
import React from 'react';

export default class Synth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volume: 1};

    this.handleVolume = this.handleVolume.bind(this);
  }

  componentDidMount() {

    let bus = parseInt(this.props.channel);
    let freq = parseInt(this.props.freq);

    let s = {
      synthDef: {
        ugen: "flock.ugen.out",
        inputs: {
          bus: bus + 2,
          expand: 1,
          sources: {
              id: "player",
              ugen: "flock.ugen.sinOsc",
              freq: freq,
              mul: 0.2,
              phase: 1
          }
        }
      }
    }

    this.synth = flock.synth(s);
  }


  handleVolume(event) {
    this.setState({volume: event.target.value});
    this.synth.input('player.mul', this.state.volume * 0.01);
  }

  render() {
    return (
      <div>
        <input type="range" defaultValue={this.state.volume} onChange={this.handleVolume} />
        <br />
        Volume: {this.state.volume}
      </div>
    );
  }
}