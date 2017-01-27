app.controller('SliderCtrl', function($scope, sliders, synthService, localData) {

  var noiseArr = [
    synthService.noise(1, 2, {filterFq: 200, amFq: 0.7, phase: 1}), // mid
    synthService.noise(1, 3, {filterFq: 400, amFq: 0.5, phase: 3}),
    synthService.noise(1, 2, {filterFq: 900, amFq: 0.3, phase: 1}), // mid-high
    synthService.noise(1, 3, {filterFq: 1700, amFq: 0.2, phase: 3}),
    synthService.noise(1, 2, {filterFq: 60, amFq: 0.1, phase: 1}), // low
    synthService.noise(1, 3, {filterFq: 70, amFq: 0.08, phase: 3}),
    synthService.noise(1, 2, {filterFq: 8000, amFq: 0.2, phase: 0.5}), // high
    synthService.noise(1, 3, {filterFq: 6000, amFq: 0.09, phase: 2})
  ]

  var left = synthService.mixer("mixerL", 2, 0, {mul: 0.1});
  var right = synthService.mixer("mixerR", 3, 1, {mul: 0.1});

  var isPlaying = false;

  $scope.status = 'Play';

  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'Pause'
      noiseArr[0].play();
    } else {
      $scope.status = 'Play'
      nodes.forEach(function(node, index) {
        node.pause();
      })
    }
  }

  var firstTime = true;

  $scope.$on('volume changed', _.debounce(function() {

    $scope.volume = localData.getVolume();
    $scope.$apply();

    if (firstTime) {
      firstTime = false;
      $scope.togglePlay();
    }

    var synthValue = $scope.volume * 0.01;

    left.input('mixerL.mul', Number(synthValue));
    right.input('mixerR.mul', Number(synthValue));

  }, 4));

});

// app.controller('PlayCtrl', function($scope, synthService) {

//   var nodes = synthService.nodes;
//   var numSynths = 18
//   var bus = 0;
//   var amFq = 1;
//   for(var i = 1; i <= numSynths; i++) {

//     var options = {
//       mul: 0.01,
//       phase: (5 % i),
//       filterFq: ((numSynths + 1) - i) * 100
//     };

//     if (i < 14) {
//       options.amFq = (1/45) * i
//     } else {
//       options.amFq = (1/15) * i
//     }

//     var id = "synth" + i;
//     bus = (i % 2 === 0) ? 0 : 1;
//     // console.log(bus,'bus');

//     nodes.push(new NoiseSynth(id, bus + 2, options));
//   }

//   var isPlaying = false;
//   $scope.status = 'Play';
//   // $scope.togglePlay = function() {
//   //   isPlaying = !isPlaying;
//   //   if (isPlaying) {
//   //     $scope.status = 'Pause'
//   //   console.log('togglePlay1');
//   //     nodes.forEach(function(node, index) {
//   //       node.flock.play();
//   //     })
//   //   } else {
//   //   console.log('togglePlay2');
//   //     $scope.status = 'Play'
//   //     nodes.forEach(function(node, index) {
//   //       node.flock.pause();
//   //     })
//   //   }
//   // }

// });

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
