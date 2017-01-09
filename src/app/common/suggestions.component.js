angular.module("common").component('suggestionsModal', {

  bindings: {
    suggestions: '=',
    open: '<'
  },

  templateUrl: './suggestions.component.html',

  controller: function(){

    function showModal(){
      $('#suggestionsModal').modal('open');
    };

    this.$onInit = function() {
      $(document).ready(function(){
        $('.modal').modal();

      });
    };

    this.$onChanges = function (changes) {
      showModal();
    };

  }

});
