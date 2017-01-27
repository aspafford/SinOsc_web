app.directive("draggable", function(localData) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.draggable({
        axis: 'y',
        containment: 'parent',
        drag: function(event, ui) {
          // convert slider position to 0-100 volume range
          var vol = localData.convertRange( ui.position.top, [ 0, -168 ], [ 0, 100 ] );
          vol = Math.round(vol);
          // console.log(vol, 'vol');
          localData.setVolume(vol);
          scope.$emit('volume changed');
        }
      })
    }
  }
})
