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

app.controller('SliderCtrl', function($scope, $timeout, noiseSynth, sliders, debounce) {

  var synth = noiseSynth;

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

app.controller('PlayCtrl', function($scope, noiseSynth) {

  var synth = noiseSynth;
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
