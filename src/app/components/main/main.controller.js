/**
 * @ngdoc controller
 * @name Main controller
 *
 * @description
 * This is the main controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("mainController", function($scope, $http, questionsSoService) {

    var vm = this;
    vm.questions = {};
    vm.isQuestions = false;

    questionsSoService.getQuestions(function(response) {
        vm.questions = response.items;
        console.log('Questions..', response);
        if (vm.questions.length) {
            vm.isQuestions = true;
        }
    });
});
