/**
 * @ngdoc controller
 * @name question controller
 *
 * @description
 * This is the new question controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("newQuestionController", function(questionService, $scope) {

    console.log($scope.simplemde);
    var vm = this;

    vm.question = {};
    vm.tags = [];
    vm.suggestions = [];
    vm.open = false;
    vm.simplemdeOptions = {

    spellChecker: false,  
    showIcons: ["code"],
    forceSync: true, 
    hideIcons:["heading"],
    previewRender: function(plainText, preview) {
        setTimeout(function() {
            preview.innerHTML = this.parent.markdown(plainText);
            Prism.highlightAll();
            console.log("EXE....")
        }.bind(this), 1)
        return "Loading..."
     },
    
    };


    vm.register = function() {
        resolveTagComponent(vm.tags);
        questionService.getSuggestions(vm.question, function(response) {
            vm.suggestions = response;

            if (vm.suggestions.length) {
                vm.open = true;
                $('#suggestionsModal').modal('open');
            }
            if (!vm.open) {
                postQuestion(vm.question);
            }

        });
    };

    var postQuestion = function(question) {
        questionService.postQuestion(question, function(response) {
            console.log(response);
        });
    };


    function resolveTagComponent(tags) {
        if (tags) {
            if (!vm.question.tags) {
                vm.question.tags = [];
            }
            tags.forEach(function(tag) {
                vm.question.tags.push(tag.text);
            })
        }
    };
});
