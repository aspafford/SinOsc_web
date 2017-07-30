/*
    ./client/components/App.jsx
*/
import React from 'react';

import { createStore } from 'redux'
import { connect } from 'react-redux'

import CounterButton from './Counter'
import counter from '../reducers'

import Settings from './Settings.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Scope from './Scope.jsx';
import SynthGroup from './SynthGroup.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = createStore(counter)

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
    this.setState(prevState => ({
      playing: !prevState.playing
    }))
  }

  render() {
    return (
      <div>
        <CounterButton
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
        <Settings />
        <MuiThemeProvider>
          <div>
            <RaisedButton name="button" className="play-button" onClick={this.togglePlay}>{this.state.playing ? 'Pause' : 'Play'}</RaisedButton>
            <Scope />
            <SynthGroup enviro={this.enviro} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
