app.controller('SliderCtrl', function($scope, sliders, synthService, localData) {

  $scope.$on('volume changed', _.debounce(function() {

    $scope.volume = localData.getVolume();
    $scope.$apply();

    var synthValue = $scope.volume * 0.01;

    synthService.nodes.mixer[0].input('mixerL.mul', Number(synthValue));
    synthService.nodes.mixer[1].input('mixerR.mul', Number(synthValue));

  }, 4));

});

app.controller('PlayCtrl', function($scope, synthService) {

  var data = {};
  var intervalId = null;

  var filterFq = 0.1;
  function noiseRoutine() {
    intervalId = window.setInterval(function () {
      // get random synth
      var synth = _.sample(synthService.nodes.noiseArr);
      // get current am freq value
      var value = synth.get('n1.freq');
      // initialize min and max values for this synth
      var rangeMax = value * 0.1; // max deviation from original value
      if (!data[synth.id]) {
        data[synth.id] = {};
        data[synth.id].range = {min: value - rangeMax, max: value + rangeMax}
        console.log(data);
      }
      // add or subtract to update value
      var variance = value * 0.01; // get a small percent of current value
      if (_.sample([0,1]) === 0) {
        value += variance;
      } else {
        value -= variance;
      }
      // check if in range
      if (value > data[synth.id].range.min && value < data[synth.id].range.max) {
        console.log('updating', synth.id, value);
        synth.input('n1.freq', Number(value));
      } else {
        console.log('OUT of bounds ', synth.id, value);
      }
    }, 500);
  }

  synthService.nodes.noiseArr = [
    synthService.noise("n1", 4, {filterFq: 200, amFq: 0.4, phase: 1}), // mid
    synthService.noise("n1", 5, {filterFq: 400, amFq: 0.3, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 500, amFq: 0.04, phase: 1}), // mid
    synthService.noise("n1", 5, {filterFq: 300, amFq: 0.03, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 900, amFq: 0.2, phase: 1}), // mid-high
    synthService.noise("n1", 5, {filterFq: 1000, amFq: 0.1, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 80, amFq: 0.07, phase: 1}), // low
    synthService.noise("n1", 5, {filterFq: 70, amFq: 0.06, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 8000, amFq: 0.05, phase: 0.5}), // high
    synthService.noise("n1", 5, {filterFq: 6000, amFq: 0.04, phase: 2}),
    synthService.noise("n1", 4, {filterFq: 11000, amFq: 0.05, phase: 0.5}), // high
    synthService.noise("n1", 5, {filterFq: 9000, amFq: 0.04, phase: 2})
  ]

  synthService.nodes.mixer = [
    synthService.mixer("mixerL", 4, 0, {mul: 0.1}),
    synthService.mixer("mixerR", 5, 1, {mul: 0.1})
  ]

  // synthService.scopeOut();

  var isPlaying = false;
  $scope.status = 'Play';
  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'Pause'
      noiseRoutine(); // start noise routine
      synthService.nodes.noiseArr[0].play();
      synthService.nodes.mixer[0].input('mixerL.mul', 0.1);
      synthService.nodes.mixer[1].input('mixerR.mul', 0.1);
    } else {
      $scope.status = 'Play'
      clearInterval(intervalId); // stop noise routine
      synthService.nodes.mixer[0].input('mixerL.mul', 0);
      synthService.nodes.mixer[1].input('mixerR.mul', 0);
    }
  }

});

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
