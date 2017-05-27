/*
    ./client/components/Noise.jsx
*/
import React from 'react';

export default class Noise extends React.Component {

  componentDidMount() {

    let bus = parseInt(this.props.channel) + 2;
    let freq = parseInt(this.props.freq);
    let amFreq = parseFloat(this.props.amFreq);

    let s = {
      synthDef: {
        ugen: "flock.ugen.out",
        inputs: {
          bus: bus,
          expand: 1,
          sources: {
            id: "n2",
            ugen: "flock.ugen.filter.biquad.bp",
            freq: freq,
            q: 0.5,
            source: {
              ugen: "flock.ugen.pinkNoise",
              mul: {
                id: "noise" + bus,
                ugen: "flock.ugen.sinOsc",
                freq: amFreq,
                phase: 2.3
              }
            }
          }
        }
      }
    }

    this.synth = flock.synth(s);
  }

  render() {
    return (
      <div>
      Noise
      </div>
    );
  }
}