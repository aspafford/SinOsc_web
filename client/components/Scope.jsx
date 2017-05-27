/*
    ./client/components/Scope.jsx
*/
import React from 'react';

export default class Scope extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volume: 20};

    this.handleVolume = this.handleVolume.bind(this);
  }

  componentDidMount() {
    let s = {
      synthDef: [{
        id: "scopeL",
        ugen: "flock.ugen.scope",
        expand: 1,
        source: {
          id: "playerL",
          ugen: "flock.ugen.in",
          mul: 0.2,
          bus: 2,
          expand: 1
        },
        options: {
          canvas: "#waveformL",
          styles: {
            strokeColor: "#88f",
            strokeWidth: 1
          }
        }
      },{
        id: "scopeR",
        ugen: "flock.ugen.scope",
        expand: 1,
        source: {
          id: "playerR",
          ugen: "flock.ugen.in",
          mul: 0.2,
          bus: 3,
          expand: 1
        },
        options: {
          canvas: "#waveformR",
          styles: {
            strokeColor: "#f88",
            strokeWidth: 1
          }
        }
      }]
    }

    this.scope = flock.synth(s);
  }

  handleVolume(event) {
    this.setState({volume: event.target.value});
    this.scope.input('playerL.mul', this.state.volume * 0.01);
    this.scope.input('playerR.mul', this.state.volume * 0.01);
  }

  render() {
    return (
      <div>
        <input type="range" defaultValue={this.state.volume} onChange={this.handleVolume} />
        <div>Volume: {this.state.volume}</div>
        <canvas id="waveformL" height="100" width="250"></canvas>
        <canvas id="waveformR" height="100" width="250"></canvas>
      </div>
    );
  }
}