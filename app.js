

app.factory('sliders', function() {
  sliders = [
    {
      name: 'Volume',
      param: 'mul',
      value: 10,
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
      var param = node.synth.inputs.sources.id + '.' + slider.param;
      node.flock.input(param, Number(value));
    })
  }
});



function NoiseSynth(id, bus, options) {

  this.options = options;

  this.bus = bus;

  this.source = "source" + bus;

  this.id = id;

  this.synth = {
    // id: this.id,
    ugen: "flock.ugen.out",
    inputs: {
      sources: {
        id: this.id,
        ugen: "flock.ugen.pinkNoise",
        mul: this.options.mul
      },
      bus: this.bus,
      expand: 1
    },
  }

  this.out = { synthDef: this.synth }

  this.flock = flock.synth(this.out)

  console.log(this, '<this');
}

app.controller('PlayCtrl', function($scope, synthService) {
  var nodes = synthService.nodes;
  var bus = 0;
  for(var i = 0; i < 2; i++) {
    var options = {};
    var id = "synth" + bus;
    options.mul = 0.1;
    nodes.push(new NoiseSynth(id, bus, options));
    bus += 1;
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
