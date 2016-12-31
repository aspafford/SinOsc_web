
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

app.controller('SliderCtrl', function($scope, sliders, synthService, localData) {

  // var nodes = synthService.nodes;
  var nodes = synthService.nodes;
  var numSynths = 18
  var bus = 0;
  var amFq = 1;
  for(var i = 1; i <= numSynths; i++) {

    var options = {
      mul: 0.01,
      phase: (5 % i),
      filterFq: ((numSynths + 1) - i) * 100
    };

    if (i < 14) {
      options.amFq = (1/45) * i
    } else {
      options.amFq = (1/15) * i
    }

    var id = "synth" + i;
    bus = (i % 2 === 0) ? 0 : 1;

    nodes.push(new NoiseSynth(id, bus, options));
  }

  var isPlaying = false;
  $scope.status = 'Play';
  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'Pause'
      console.log($scope.status);
      nodes.forEach(function(node, index) {
        node.flock.play();
      })
    } else {
      $scope.status = 'Play'
      console.log($scope.status);
      nodes.forEach(function(node, index) {
        node.flock.pause();
      })
    }
  }
  var firstTime = true;

    $scope.$on('volume changed', function() {
      $scope.volume = localData.getVolume();
      $scope.$apply();

      if (firstTime) {
        firstTime = false;
        $scope.togglePlay();
      }

      var synthValue = $scope.volume * 0.01;

      nodes.forEach(function(node, index) {
        var param = node.synth.inputs.sources.source.mul.id + '.mul';
        node.flock.input(param, Number(synthValue));
      })
    });

});

app.directive("draggable", function(localData) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.draggable({
        axis: 'y',
        containment: 'parent',
        drag: function(event, ui) {
          // convert slider position to 0-100 volume range
          var vol = localData.convertRange( ui.position.top, [ 0, -168 ], [ 0, 100 ] );
          vol = Math.round(vol);
          console.log(vol, 'vol');
          localData.setVolume(vol);
          scope.$emit('volume changed');
        }
      })
    }
  }
})


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

}

app.controller('PlayCtrl', function($scope, synthService) {

  var nodes = synthService.nodes;
  var numSynths = 18
  var bus = 0;
  var amFq = 1;
  for(var i = 1; i <= numSynths; i++) {

    var options = {
      mul: 0.01,
      phase: (5 % i),
      filterFq: ((numSynths + 1) - i) * 100
    };

    if (i < 14) {
      options.amFq = (1/45) * i
    } else {
      options.amFq = (1/15) * i
    }

    var id = "synth" + i;
    bus = (i % 2 === 0) ? 0 : 1;

    nodes.push(new NoiseSynth(id, bus, options));
  }

  var isPlaying = false;
  $scope.status = 'Play';
  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'Pause'
      nodes.forEach(function(node, index) {
        node.flock.play();
      })
    } else {
      $scope.status = 'Play'
      nodes.forEach(function(node, index) {
        node.flock.pause();
      })
    }
  }

});
