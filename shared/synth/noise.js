app.factory('noiseSynth', function() {

  var synth = flock.synth({
    synthDef: [
    {
      id: "scopeL",
      ugen: "flock.ugen.scope",
      source: {
        id: "playerL",
        ugen: "flock.ugen.pinkNoise",
        mul: 0.1
      },
      options: {
        canvas: "#waveformL",
        styles: {
          strokeColor: "blue",
          strokeWidth: 4
        }
      }
    },
    {
      id: "scopeR",
      ugen: "flock.ugen.scope",
      source: {
        id: "playerR",
        ugen: "flock.ugen.pinkNoise",
        mul: 0.1
      },
      options: {
        canvas: "#waveformR",
        styles: {
          strokeColor: "red",
          strokeWidth: 4
        }
      }
    }
    ]

  })

  return synth;
})
