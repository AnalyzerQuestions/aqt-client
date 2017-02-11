angular.module("common").component('sideNav', {

    bindings: {
        name: '<'
    },

    templateUrl: './side-nav.component.html',

    controller: function() {

        $(".button-collapse").sideNav();
        console.log(localStorage.getItem("userSO").soPt);

    }

});
