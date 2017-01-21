angular.module("components").directive('custom-simplemde', [function(){
  return {
    restrict: 'A',
    require: 'simplemde',
    link: function(scope, element, attrs, simplemde) {
      var mde = simplemde.get();
      console.log(mde.value(), "fdsfsdfsda");

      simplemde.rerenderPreview()
    }
  }
}]);
