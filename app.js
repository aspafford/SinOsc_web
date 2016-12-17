

app.factory('sliders', function() {
  sliders = [
    {
      // synthId: 'playerL',
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
  console.log(nodes, 'nodes');



  $scope.sliders = sliders;

  $scope.changedSlider = function(slider, value) {
    // scale percentage values
    if (slider.options && slider.options.scale === 'percent') {
      value = (value * 0.01).toFixed(2);
    }
    // to-do: debounce
    console.log('updating:', slider, value);
    nodes[0].flock.input("source0" + '.' + slider.param, Number(value));
    nodes[1].flock.input("source1" + '.' + slider.param, Number(value));
  }
});



function NoiseSynth(id, bus, options) {

  this.options = options;

  this.bus = bus;

  this.source = "source" + bus;

  this.id = id;

  this.synth = {
    id: this.id,
    ugen: "flock.ugen.out",
    inputs: {
      sources: {
        id: this.source,
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

  // var synths = [];
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
      nodes[0].flock.play();
      nodes[1].flock.play();
    } else {
      $scope.status = 'play'
      nodes[0].flock.pause();
      nodes[1].flock.pause();
    }
  }
});
