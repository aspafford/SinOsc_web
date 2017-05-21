/*
    ./client/components/App.jsx
*/
import React from 'react';
import Synth from './Synth.jsx';

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
        <Synth />
      </div>
    );
  }
}
