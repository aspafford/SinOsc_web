/*
    ./client/components/SynthGroup.jsx
*/
import React from 'react';
import Noise from './Noise.jsx';

export default class SynthGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {numChildren: 2};

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    let numChildren = this.state.numChildren += 2;
    this.setState({numChildren: numChildren});
  }

  render() {

    const children = [];

    for (let i = 0; i < this.state.numChildren; i++) {
      let channel = i % 2;
      children.push(<Noise key={i} enviro={this.props.enviro} channel={channel} freq="400" amFreq="1.0" />);
    }

    return (
      <div>
        <div>{children}</div>
        <div><button onClick={this.handleAdd}>Add +</button></div>
        <div>Synth count: {this.state.numChildren}</div>
      </div>
    );
  }
}