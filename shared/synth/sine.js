app.factory('sineSynth', function() {

  var synth = flock.synth({
    synthDef: {
      ugen: "flock.ugen.scope",
      source: {
        id: "player",
        ugen: "flock.ugen.sinOsc",
        freq: 30,
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
  })

  return synth
})
