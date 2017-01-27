app.service('localData', function() {
  this.data = {}

  this.setVolume = function(value) {
    this.data.volume = value;
  }
  this.getVolume = function() {
    // console.log('get vol:', this.data.volume);
    return this.data.volume || 0;
  }

  // http://stackoverflow.com/a/14224813
  this.convertRange = function( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
  }
})