angular.module("aqtApp").component('suggestionsModal', {

  bindings: {
    suggestions: '<'
  },

  templateUrl: './suggestions.component.html',

  controller: function(){
    $(document).ready(function(){
      $('.modal').modal();
    });

    $('modal-suggestions').modal('open');

  }

});
