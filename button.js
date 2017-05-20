class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: false, volume: 1};

    this.clicker = this.clicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    this.synth = flock.synth({
      synthDef: {
        ugen: "flock.ugen.scope",
        source: {
          id: "player",
          ugen: "flock.ugen.sinOsc",
          freq: 300,
          mul: 0.01
        },
        options: {
          canvas: "#waveform",
          styles: {
            strokeColor: "yellow",
            strokeWidth: 4
          }
        }
      }
    });

  }

  componentWillUnmount() {
  }

  handleChange(event) {
    this.setState({volume: event.target.value});
    this.synth.input('player.mul', this.state.volume * 0.01);
  }

  clicker() {

    if (this.state.status === false) {
      console.log('play...')
      this.synth.play();

    } else {
      console.log('pause...')
      this.synth.pause();
    }

    console.log('this.state.status', this.state.status);

    this.setState(prevState => ({
      status: !prevState.status
    }))
  }

  render() {
    return (
      <div>
        <button name="button" onClick={this.clicker}>{this.state.status ? 'Pause' : 'Play'}</button>
        <br />
        <input type="range" defaultValue={this.state.volume} onChange={this.handleChange} />
        <br />
        Volume: {this.state.volume}
      </div>
    );
  }
}

ReactDOM.render(
  <Button />,
  document.getElementById('root')
);