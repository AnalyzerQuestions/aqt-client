/**
 * @ngdoc module
 * @name components
 *
 * @description
 * This is the directive to chip input.
 *
 * @author <a href="http://krescruz.github.io/npm angular-materialize/#chips">Angular Materialize</a>
 **/
angular.module("components").directive('aqtchip', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            ngModel: '=',
            placeholder: '@',
            secondaryPlaceholder: '@',
        },
        link: function(scope, element, attrs) {
            $timeout(function() {
                element.material_chip({
                    data: scope.ngModel || [],
                    placeholder: scope.placeholder || '',
                    secondaryPlaceholder: scope.secondaryPlaceholder || '',
                })
                element.on('chip.add', function(e, chip) {
                    scope.ngModel = element.data().chips.map(function(item) {
                        return item.tag
                    })
                    scope.$apply()
                })
                element.on('chip.delete', function(e, chip) {
                    scope.ngModel = element.data().chips.map(function(item) {
                        return item.tag
                    })
                    scope.$apply()
                })
            })
        }
    };
}]);
