/**
 * @ngdoc controller
 * @name question controller
 *
 * @description
 * This is the new question controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("newQuestionController", function(questionService, $scope, $location, blockUI) {

    var vm = this;

    vm.question = {};
    vm.suggestions = [];
    vm.open = false;

    vm.register = function() {
        blockUI.start('Checking question...');
        questionService.getSuggestions(vm.question, function(response) {
            vm.suggestions = response;

            if (vm.suggestions.length) {
                blockUI.stop();
                vm.open = true;
                $('#suggestionsModal').modal('open');
            }
            if (vm.suggestions.length < 3) {
                postQuestion(vm.question);
            }
        });
    };

    var postQuestion = function(question) {
        questionService.postQuestion(question, function(response) {
            $location.path("/main");
            //Materialize.toast("Pergunta Publicada com  sucesso", 6000);
            Materialize.toast("Question published successfully", 6000);
        });
    };
});
