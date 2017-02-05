app.controller('PlayCtrl', function($scope, $rootScope, $sce, synthService) {

  var data = {};
  var intervalId = null;

  var filterFq = 0.1;
  function noiseRoutine() {
    intervalId = window.setInterval(function () {
      // get random synth
      var synth = _.sample(synthService.nodes.noiseArr);

      // get current am freq value
      var fq = synth.get('n1.freq');

      // cf
      var cf = synth.get('n2.freq');


      // initialize min and max values for this synth
      // var rangeMax = value * 0.4; // max deviation from original value
      var rangeMax = 0.4; // max deviation from original value
      if (!data[synth.id]) {
        data[synth.id] = {};
        data[synth.id].fqOrig = fq;
        data[synth.id].cfOrig = cf;
        // data[synth.id].range = {min: value - rangeMax, max: value + rangeMax}
        console.log(data);
      }
      var fqOrig = data[synth.id].fqOrig;
      var cfOrig = data[synth.id].cfOrig;
      // add or subtract to update value
      var variance = fq * 0.01; // get a small percent of current value
      var cfVariance = cf * 0.02;
      if (_.sample([0,1]) === 0) {
        fq += variance;
      } else {
        fq -= variance;
      }
      if (_.sample([0,1]) === 0) {
        cf += cfVariance;
      } else {
        cf -= cfVariance;
      }
      cf = Math.round(cf);
      // console.log('cf:', cf);
      // check if in range
      // update modulation frequency
      if (_.sample([0,1]) === 0) {
        var fqDiff = fqOrig * rangeMax;
        var fqMin = fqOrig - fqDiff;
        var fqMax = fqOrig + fqDiff;
        // console.log("fq:", fq, "fqMin", fqMin, "fqMax", fqMax, "fqOrig", fqOrig);
        if (fq > fqMin && fq < fqMax) {
          console.log('updating FQ', synth.id, fq);
          synth.input('n1.freq', Number(fq));
          $('.speed-animation.' + synth.id).css('animation-duration', (1/fq) / 2 + 's');
          $rootScope.$broadcast('update');
        } else {
          console.log('FQ OUT of bounds ', synth.id, fq);
        }
      } else {
        var cfDiff = cfOrig * rangeMax;
        var cfMin = cfOrig - cfDiff;
        var cfMax = cfOrig + cfDiff;
        console.log("cf:", cf, "cfMin", cfMin, "cfMax", cfMax, "cfOrig", cfOrig);
        if (cf > cfMin && cf < cfMax) {
          console.log('updating CF', synth.id, cf);
          synth.input('n2.freq', Number(cf));
          $rootScope.$broadcast('update');
        } else {
          console.log('CF OUT of bounds ', synth.id, cf);
        }
      }
      // update center frequency
    }, 900);
  }

  synthService.nodes.noiseArr = [
    synthService.noise("n1", 4, {filterFq: 200, amFq: 0.400}), // mid
    synthService.noise("n1", 5, {filterFq: 200, amFq: 0.400}),
    synthService.noise("n1", 4, {filterFq: 500, amFq: 0.040}), // mid
    synthService.noise("n1", 5, {filterFq: 500, amFq: 0.040}),
    synthService.noise("n1", 4, {filterFq: 1000, amFq: 0.200}), // mid-high
    synthService.noise("n1", 5, {filterFq: 1000, amFq: 0.200}),
    synthService.noise("n1", 4, {filterFq: 37, amFq: 0.070}), // low
    synthService.noise("n1", 5, {filterFq: 37, amFq: 0.070}),
    synthService.noise("n1", 4, {filterFq: 6000, amFq: 0.050}), // high
    synthService.noise("n1", 5, {filterFq: 6000, amFq: 0.050}),
    synthService.noise("n1", 4, {filterFq: 8000, amFq: 0.040}), // high
    synthService.noise("n1", 5, {filterFq: 8000, amFq: 0.040})
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
      $scope.status = '| |'
      noiseRoutine(); // start noise routine
      synthService.nodes.noiseArr.forEach(function(item) {
        item.play();
        var fq = item.get('n1.freq');
        $('.speed-animation.' + item.id).css('animation-duration', (1/fq) / 2 + 's');
      });
      $('.speed-animation').removeClass('paused');
    } else {
      $scope.status = '>'
      clearInterval(intervalId); // stop noise routine

      synthService.nodes.noiseArr.forEach(function(item) {
        item.pause();
      });
      $('.speed-animation').addClass('paused');
    }
    $rootScope.$broadcast('update');
  }

});
