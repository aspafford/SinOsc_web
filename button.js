class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: false};

    this.clicker = this.clicker.bind(this);
  }

  componentDidMount() {

    this.synth = flock.synth({
      synthDef: {
        ugen: "flock.ugen.scope",
        source: {
          id: "player",
          ugen: "flock.ugen.sinOsc",
          freq: 300,
          mul: 0.1
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
      </div>
    );
  }
}

ReactDOM.render(
  <Button />,
  document.getElementById('root')
);