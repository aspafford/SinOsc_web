app.controller('SliderCtrl', function($scope, sliders, synthService, localData) {

  $scope.$on('volume changed', _.debounce(function() {

    $scope.volume = localData.getVolume();
    $scope.$apply();

    var synthValue = $scope.volume * 0.01;

    synthService.nodes.mixer[0].input('mixerL.mul', Number(synthValue));
    synthService.nodes.mixer[1].input('mixerR.mul', Number(synthValue));

  }, 4));

});
