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

    this.mixer = flock.synth({
      synthDef: {
        ugen: "flock.ugen.out",
        bus: bus,
        expand: 1,
        sources: {
          id: "mixer" + bus,
          ugen: "flock.ugen.in",
          bus: bus + 2,
          mul: 0.2,
          expand: 1
        }
      }
    });

    let canvas = "#" + this.props.canvas;

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

    this.scopeOut = flock.synth({
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
      })

    this.sin1 = function(bus, fq) {
    return flock.synth({
      synthDef: {
        ugen: "flock.ugen.out",
        inputs: {
          bus: bus,
          expand: 2,
          sources: {
              ugen: "flock.ugen.sinOsc",
              freq: fq,
              mul: 0.2,
              phase: 1
          }
        }
      }
    });
  }

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