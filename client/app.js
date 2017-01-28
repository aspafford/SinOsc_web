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

  synthService.nodes.noiseArr = [
    synthService.noise(1, 4, {filterFq: 200, amFq: 0.7, phase: 1}), // mid
    synthService.noise(1, 5, {filterFq: 400, amFq: 0.5, phase: 3}),
    synthService.noise(1, 4, {filterFq: 900, amFq: 0.3, phase: 1}), // mid-high
    synthService.noise(1, 5, {filterFq: 1700, amFq: 0.2, phase: 3}),
    synthService.noise(1, 4, {filterFq: 60, amFq: 0.1, phase: 1}), // low
    synthService.noise(1, 5, {filterFq: 70, amFq: 0.08, phase: 3}),
    synthService.noise(1, 4, {filterFq: 8000, amFq: 0.2, phase: 0.5}), // high
    synthService.noise(1, 5, {filterFq: 6000, amFq: 0.09, phase: 2})
  ]

  synthService.nodes.mixer = [
    synthService.mixer("mixerL", 4, 2, {mul: 0.1}),
    synthService.mixer("mixerR", 5, 3, {mul: 0.1})
  ]

  synthService.scopeOut();

  var isPlaying = false;
  $scope.status = 'Play';
  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'Pause'
      synthService.nodes.noiseArr[0].play();
      synthService.nodes.mixer[0].input('mixerL.mul', 0.1);
      synthService.nodes.mixer[1].input('mixerR.mul', 0.1);
    } else {
      $scope.status = 'Play'

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
