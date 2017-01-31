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
