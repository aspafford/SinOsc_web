function NoiseSynth(id, bus) {

  this.bus = bus;

  this.source = "source" + id;

  this.id = id;

  this.synth = {
    id: this.id,
    ugen: "flock.ugen.out",
    inputs: {
      sources: {
        id: this.source,
        ugen: "flock.ugen.pinkNoise",
        mul: 0.1
      },
      bus: this.bus,
      expand: 1
    },
  }

  this.out = { synthDef: this.synth }

  this.flock = flock.synth(this.out)

  console.log(this, '<this');
}

app.controller('PlayCtrl', function($scope) {

  var synths = [];

  var bus = 0;

  for(var i = 0; i < 2; i++) {
    var id = "synth" + bus;
    synths.push(new NoiseSynth(id, bus));
    bus += 1;
  }

  var isPlaying = false;

  $scope.status = 'play';

  $scope.togglePlay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      $scope.status = 'pause'
      synths[0].flock.play();
      synths[1].flock.play();
    } else {
      $scope.status = 'play'
      synths[0].flock.pause();
      synths[1].flock.pause();
    }
  }
});
