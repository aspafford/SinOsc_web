app.service("synthService", function() {
  this.nodes = [];

  this.mixer = function(id, input, out, options) {
    return flock.synth({
      synthDef: {
        ugen: "flock.ugen.out",
        bus: out,
        expand: 1,
        sources: {
          id: id,
          ugen: "flock.ugen.in",
          bus: input,
          mul: options.mul,
          expand: 1
        }
      }
    });
  }

  this.sin1 = function(bus, fq) {
    return flock.synth({
      synthDef: {
        ugen: "flock.ugen.out",
        inputs: {
          bus: bus,
          expand: 2,
          sources: {
              ugen: "flock.ugen.sinOsc",
              freq: fq,
              mul: 0.2,
              phase: 1
          }
        }
      }
    });
  }

  this.noise = function(id, bus, options) {
    return(
      flock.synth({
        synthDef: {
          ugen: "flock.ugen.out",
          inputs: {
            bus: bus,
            expand: 1,
            sources: {
              ugen: "flock.ugen.filter.biquad.bp",
              freq: options.filterFq,
              q: 0.5,
              source: {
                ugen: "flock.ugen.pinkNoise",
                mul: {
                  id: id,
                  ugen: "flock.ugen.sinOsc",
                  freq: options.amFq,
                  mul: 1,
                  phase: options.phase
                }
              }
            }
          }
        }
      })
    )
  }

  this.scopeOut = function() {
    return flock.synth({
      synthDef: [{
        id: "scopeL",
        ugen: "flock.ugen.scope",
        expand: 1,
        source: {
          id: "playerL",
          ugen: "flock.ugen.in",
          bus: 2,
          expand: 1
        },
        options: {
          canvas: "#waveformL",
          styles: {
            strokeColor: "yellow",
            strokeWidth: 1
          }
        }
      },{
        id: "scopeR",
        ugen: "flock.ugen.scope",
        expand: 1,
        source: {
          id: "playerR",
          ugen: "flock.ugen.in",
          bus: 3,
          expand: 1
        },
        options: {
          canvas: "#waveformR",
          styles: {
            strokeColor: "yellow",
            strokeWidth: 1
          }
        }
      }]
    })
  }

})
