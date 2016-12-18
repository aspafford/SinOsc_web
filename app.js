

app.factory('sliders', function() {
  sliders = [
    {
      name: 'Volume',
      param: 'mul',
      value: 1,
      min: 0,
      max: 100,
      options: {
        scale: 'percent'
      }
    }
  ]
  return sliders;
})

app.controller('SliderCtrl', function($scope, sliders, synthService) {
  var nodes = synthService.nodes;
  $scope.sliders = sliders;
  $scope.changedSlider = function(slider, value) {
    // scale percentage values
    if (slider.options && slider.options.scale === 'percent') {
      value = (value * 0.01).toFixed(2);
    }
    // to-do: debounce
    nodes.forEach(function(node, index) {
      var param = node.synth.inputs.sources.source.mul.id + '.' + slider.param;
      node.flock.input(param, Number(value));
    })
  }
});



function NoiseSynth(id, bus, options) {

  this.synth = {
    ugen: "flock.ugen.out",
    inputs: {
      sources: {
        ugen: "flock.ugen.filter.biquad.bp",
        freq: options.filterFq,
        q: 0.5,
        source: {
          ugen: "flock.ugen.pinkNoise",
          mul: {
            id: id,
            ugen: "flock.ugen.sinOsc",
            freq: options.amFq,
            mul: options.mul,
            phase: options.phase
          }
        }
      },
      bus: bus,
      expand: 1
    },
  }

  this.out = { synthDef: this.synth }

  this.flock = flock.synth(this.out)

  console.log(this, '<this');
}

app.controller('PlayCtrl', function($scope, synthService) {

  var nodes = synthService.nodes;
  var numSynths = 12
  var bus = 0;
  for(var i = 1; i <= numSynths; i++) {
    // var counter = i + 1;
    var options = {
      mul: 0.01,
      phase: (5 % i),
      filterFq: ((numSynths + 1) - i) * 100,
      amFq: (1/45) * i
    };

    var id = "synth" + i;
    bus = (i % 2 === 0) ? 0 : 1;

    console.log('options:', options);
    nodes.push(new NoiseSynth(id, bus, options));
  }

  var isPlaying = false;
  $scope.status = 'play';
  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'pause'
      nodes.forEach(function(node, index) {
        node.flock.play();
      })
    } else {
      $scope.status = 'play'
      nodes.forEach(function(node, index) {
        node.flock.pause();
      })
    }
  }
});
