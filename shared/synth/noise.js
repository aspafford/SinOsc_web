app.factory('noiseSynth', function() {

  var synth = flock.synth({
    synthDef: {
      ugen: "flock.ugen.scope",
      source: {
        id: "player",
        ugen: "flock.ugen.pinkNoise",
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

  return synth;
})
