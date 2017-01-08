angular.module("aqtApp").controller("newQuestionController", function(questionService){

  var vm = this;

  vm.question = {};
  vm.tags = [];
  vm.suggestions = [];
  vm.openModal = false;

  vm.register = function() {
    questionService.getSuggestions(vm.question, function(response){
      vm.suggestions = response;
      vm.openModal = true;
    })
  };
});
