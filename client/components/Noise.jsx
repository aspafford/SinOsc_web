/*
    ./client/components/Noise.jsx
*/
import React from 'react';

export default class Noise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {freq: 2, amFreq: 1.0};

    this.handleRange = this.handleRange.bind(this);
  }
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
            id: "freq" + bus,
            ugen: "flock.ugen.filter.biquad.bp",
            freq: freq,
            q: 0.5,
            source: {
              ugen: "flock.ugen.pinkNoise",
              mul: {
                id: "amFreq" + bus,
                ugen: "flock.ugen.sinOsc",
                freq: amFreq,
                phase: 1
              }
            }
          }
        }
      }
    }

    this.synth = flock.synth(s);
  }

  update(field, num) {

    let val = 0;

    switch (field) {
      case 'freq':
        val = _.max([num * 10, 20]);
        break;
      case 'amFreq': {
        val = _.round(num * 0.01, 2);
        break;
      }
    }

    return val;
  }

  handleRange(event) {

    let field = event.target.name;

    let bus = parseInt(this.props.channel) + 2;

    let val = this.update(field, event.target.value)

    this.setState({[field]: val});
    this.synth.input(field + bus +'.freq', this.state[field]);
    console.log('noise:', 'fq', this.state.freq, 'am', this.state.amFreq, 'range:', event.target.value);
  }

  render() {
    return (
      <div>
      <div>Noise [Freq: {this.state.freq}, amFreq: {this.state.amFreq}]</div>
      <input type="range" name="freq" defaultValue={this.state.freq} onChange={this.handleRange} />
      <input type="range" name="amFreq" defaultValue={this.state.amFreq} onChange={this.handleRange} />
      </div>
    );
  }
}