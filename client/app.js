app.controller('SliderCtrl', function($scope, sliders, synthService, localData) {

  $scope.$on('volume changed', _.debounce(function() {

    $scope.volume = localData.getVolume();
    $scope.$apply();

    var synthValue = $scope.volume * 0.01;

    synthService.nodes.mixer[0].input('mixerL.mul', Number(synthValue));
    synthService.nodes.mixer[1].input('mixerR.mul', Number(synthValue));

  }, 4));

});

app.controller('PlayCtrl', function($scope, $rootScope, $sce, synthService) {

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
      var rangeMax = value * 0.4; // max deviation from original value
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
      value = value.toFixed(3);
      console.log('value:', value);
      // check if in range
      if (value > data[synth.id].range.min && value < data[synth.id].range.max) {
        console.log('updating', synth.id, value);
        synth.input('n1.freq', Number(value));
        $rootScope.$broadcast('update');
      } else {
        console.log('OUT of bounds ', synth.id, value);
      }
    }, 500);
  }

  synthService.nodes.noiseArr = [
    synthService.noise("n1", 4, {filterFq: 200, amFq: 0.400, phase: 1}), // mid
    synthService.noise("n1", 5, {filterFq: 400, amFq: 0.300, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 500, amFq: 0.040, phase: 1}), // mid
    synthService.noise("n1", 5, {filterFq: 300, amFq: 0.030, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 900, amFq: 0.200, phase: 1}), // mid-high
    synthService.noise("n1", 5, {filterFq: 1000, amFq: 0.100, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 30, amFq: 0.070, phase: 1}), // low
    synthService.noise("n1", 5, {filterFq: 37, amFq: 0.060, phase: 3}),
    synthService.noise("n1", 4, {filterFq: 8000, amFq: 0.050, phase: 0.5}), // high
    synthService.noise("n1", 5, {filterFq: 6000, amFq: 0.040, phase: 2}),
    synthService.noise("n1", 4, {filterFq: 11000, amFq: 0.050, phase: 0.5}), // high
    synthService.noise("n1", 5, {filterFq: 9000, amFq: 0.040, phase: 2})
  ]

  synthService.nodes.mixer = [
    synthService.mixer("mixerL", 4, 2, {mul: 0.1}),
    synthService.mixer("mixerR", 5, 3, {mul: 0.1})
  ]

  synthService.scopeOut();

  var isPlaying = false;
  $scope.status =  '>';
  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = '||'
      noiseRoutine(); // start noise routine
      synthService.nodes.noiseArr[0].play();
      synthService.nodes.mixer[0].input('mixerL.mul', 0.1);
      synthService.nodes.mixer[1].input('mixerR.mul', 0.1);
    } else {
      $scope.status = '>'
      clearInterval(intervalId); // stop noise routine
      synthService.nodes.mixer[0].input('mixerL.mul', 0);
      synthService.nodes.mixer[1].input('mixerR.mul', 0);
    }
  }

});

app.controller('ChannelCtrl', function($rootScope, $scope, $timeout, synthService, localData) {

  $scope.filterLeft = function(item) {
    return item.bus == 4;
  }
  $scope.filterRight = function(item) {
    return item.bus == 5;
  }

  $scope.synths = synthService.nodes.noiseArr;

  $scope.channels = []; // local copy of synths

  $scope.synths.forEach(function(synth, index) {
    var obj = {};
    obj['id'] = synth.id;
    obj['bus'] = $scope.synths[index].options.synthDef.inputs.bus;
    obj['speed'] = $scope.synths[index].get('n1.freq');
    // get filter center fq
    var fq = $scope.synths[index].get('n2.freq');
    obj['cf'] = fq;
    // convert to logarithmic 0-255 gray-scale
    fq = Math.log(fq);
    // hard-coding 30hz - 11khz range (log: 3.401 - 9.306)
    fq = localData.convertRange(fq, [3.401, 9.306], [0, 255])
    fq = Math.round(fq);
    // gray -- add as property to synth obj
    obj['color'] = fq;
    obj['grayscale'] = [fq,fq,fq].join(',');
    $scope.channels.push(obj);
  })

  $scope.$on('update', function() {
    $timeout(function() {
      $scope.synths.forEach(function(synth, index) {
        $scope.channels[index].speed = synth.get('n1.freq');
      })
    }, 100)
  })
  console.log($scope.synths, '< synths');
})

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
