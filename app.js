var app = angular.module('app', []);

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

app.factory('sliders', function() {
  sliders = [
    {
      name: 'Frequency',
      param: 'freq',
      value: 30,
      min: 20,
      max: 100
    },
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
  ];

  return sliders;
})

// Create an AngularJS service called debounce
// http://stackoverflow.com/a/13320016
app.factory('debounce', function($timeout, $q) {
  // The service is actually this function, which we call with the func
  // that should be debounced and how long to wait in between calls
  return function debounce(func, wait, immediate) {
    var timeout;
    // Create a deferred object that will be resolved when we need to
    // actually call the func
    var deferred = $q.defer();
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };
      var callNow = immediate && !timeout;
      if ( timeout ) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        deferred.resolve(func.apply(context,args));
        deferred = $q.defer();
      }
      return deferred.promise;
    };
  };
});

app.controller('SliderCtrl', function($scope, $timeout, sineSynth, sliders, debounce) {

  var synth = sineSynth;

  $scope.sliders = sliders;

  $scope.changedSlider = function(slider, value) {

    // scale percentage values
    if (slider.options && slider.options.scale === 'percent') {
      value = (value * 0.01).toFixed(2);
    }
    // to-do: debounce
    console.log('updating:', slider, value);
    synth.input("player." + slider.param, Number(value));
  }
});

app.controller('PlayCtrl', function($scope, sineSynth) {

  var synth = sineSynth;
  var isPlaying = false;

  $scope.status = 'play';

  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'pause'
      synth.play();
    } else {
      $scope.status = 'play'
      synth.pause();
    }
  }
});
