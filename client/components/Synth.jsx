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

    let canvas = "#" + this.props.canvas;

    let freq = parseInt(this.props.freq);


    let s = {
      synthDef: [
        {
          ugen: "flock.ugen.silence"
        },
        {
          ugen: "flock.ugen.silence"
        }
      ]
    }

    s.synthDef[this.props.channel] = {
      ugen: "flock.ugen.scope",
      source: {
        id: "player",
        ugen: "flock.ugen.sinOsc",
        freq: freq,
        mul: 0.01
      },
      options: {
        canvas: canvas,
        styles: {
          strokeColor: "yellow",
          strokeWidth: 4
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