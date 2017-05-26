/*
    ./client/components/Scope.jsx
*/
import React from 'react';

export default class Scope extends React.Component {

  componentDidMount() {
    let s = {
      synthDef: [{
        id: "scopeL",
        ugen: "flock.ugen.scope",
        expand: 1,
        source: {
          id: "playerL",
          ugen: "flock.ugen.in",
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

    this.scopeOut = flock.synth(s);
  }

  render() {
    return (
      <div>
        <canvas id="waveformL" height="100" width="250"></canvas>
        <canvas id="waveformR" height="100" width="250"></canvas>
      </div>
    );
  }
}