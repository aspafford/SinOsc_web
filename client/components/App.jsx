/*
    ./client/components/App.jsx
*/
import React from 'react';
import Scope from './Scope.jsx';
import Noise from './Noise.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {playing: false};

    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillMount() {
    this.enviro = flock.init();
  }

  togglePlay() {
     if (this.state.playing === false) {
      this.enviro.play();
    } else {
      this.enviro.stop();
    }
    console.log('this.state.playing', this.state.playing);
    this.setState(prevState => ({
      playing: !prevState.playing
    }))
  }

  render() {
    return (
      <div>
        <button name="button" onClick={this.togglePlay}>{this.state.playing ? 'Pause' : 'Play'}</button>
        <br />
        <Noise channel="0" freq="400" amFreq="1.0" />
        <Noise channel="1" freq="400" amFreq="1.0" />
        <Scope />
      </div>
    );
  }
}
