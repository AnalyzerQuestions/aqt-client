angular.module('aqtDirectivies', [])
.directive('simpleMde', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: '<textarea></textarea>',
        link: function($scope, $element, $attrs, $ngModelCtrl){
            var clear = (typeof $attrs.clear !== 'undefined') && ($attrs.clear !== "false");
            var editor = new SimpleMDE({
                element: $element[0].querySelector('textarea'),
                forceSync: true,
                status: false
            });
            editor.codemirror.on('change', function(){
                $ngModelCtrl && $ngModelCtrl.$setViewValue(editor.codemirror.getValue());
            });
            $ngModelCtrl.$render = function(){
                editor.codemirror.setValue($ngModelCtrl.$viewValue || '');
                clear && editor.codemirror.clearHistory();
                $ngModelCtrl.$setPristine();
            };
        }
    }
});
