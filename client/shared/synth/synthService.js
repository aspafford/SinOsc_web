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

  this.sine = function() {
    return(
      flock.synth({
        synthDef: {
          ugen: "flock.ugen.scope",
          source: {
            id: "player",
            ugen: "flock.ugen.sinOsc",
            freq: 30,
            mul: 0.1
          },
          options: {
            canvas: "#waveform",
            styles: {
              strokeColor: "yellow",
              strokeWidth: 4
            }
          }
        }
      })
    )
  }



})
