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

    this.synth = flock.synth({
      synthDef: {
        ugen: "flock.ugen.scope",
        source: {
          id: "player",
          ugen: "flock.ugen.sinOsc",
          freq: 200,
          mul: 0.03
        },
        options: {
          canvas: "#waveform",
          styles: {
            strokeColor: "yellow",
            strokeWidth: 4
          }
        }
      }
    });

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