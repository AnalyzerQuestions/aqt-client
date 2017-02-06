(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name aqtApp
 *
 * @description
 * This is the aqtApp module. It is the major module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("aqtApp", ['ngRoute', 'components', 'templates', 'common', 'pascalprecht.translate', 'ngAnimate']);


// if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
//
//   navigator.serviceWorker.register('sw.js', {scope: './'
//   }).then(function(registration) {
//     if (typeof registration.update == 'function') {
//       registration.update();
//     }
//   }).catch(function(e) {
//     console.error('Error during service worker registration:', e);
//   });
//
// };
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc router
 * @name Route Provide
 *
 * @description
 * This is the aqtApp router. It is the major route.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("aqtApp").config(["$routeProvider", function($routeProvider) {

    $routeProvider.when("/main", {
        templateUrl: './main.html'

    }).when("/blank", {
        templateUrl: './blank.html'

    }).when("/", {
        templateUrl: './login.html',
        controller: 'loginController as loginCtrl'

    }).when("/new", {
        templateUrl: './new-question.html',
        controller: 'newQuestionController as nqCtrl'

    }).otherwise({
        redirectTo: '/'
    });
}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name common
 *
 * @description
 * This is the common module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module('common', []);
})(window.angular);
(function(angular){
'use strict';
angular.module("common").component('btnFb', {

  bindings: {
    url: '<',
    icon: '@'
  },

  templateUrl: './floating-button.component.html',

});
})(window.angular);
(function(angular){
'use strict';
angular.module("common").component('navBar', {

  bindings: {
    name: '<'
  },

  templateUrl: './navBar.component.html',

  controller: function(){

  }

});
})(window.angular);
(function(angular){
'use strict';
angular.module("common").component('suggestionsModal', {

    bindings: {
        suggestions: '=',
        open: '<'
    },

    templateUrl: './suggestions.component.html',

    controller: function() {

        function showModal() {
            $('#suggestionsModal').modal('open');
        };

        this.$onInit = function() {
            $(document).ready(function() {
                $('.modal').modal();

            });
        };

        this.onDestry = function() {
            this.suggestions = [];
        };
    }
});
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name common
 *
 * @description
 * This is the common module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/

angular.module('components', ['simplemde']);
})(window.angular);
(function(angular){
'use strict';
angular.module("components").directive('simpleMde', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: `<textarea></textarea>`,
        link: function(scope, element, attrs, ngModelCtrl) {
            var editor = new SimpleMDE({
                element: element[0].querySelector('textarea'),
                spellChecker: true,
                styleSelectedText: true,
                showIcons: ["code"],
                forceSync: true,
                indentWithTabs: false,
                lineWrapping: false,
                hideIcons: ["heading", "fullscreen", "side-by-side"],
                previewRender: function(plainText, preview) {
                    setTimeout(function() {
                        preview.innerHTML = this.parent.markdown(plainText);
                        Prism.highlightAll();
                    }.bind(this), 1)
                    return "Loading..."
                },
                tabSize: 1,
                status: false,
                lineWrapping: true,
            });
            editor.codemirror.on('change', function() {
                ngModelCtrl && ngModelCtrl.$setViewValue(editor.markdown(editor.codemirror.getValue()));
            });
        }
    }
})
})(window.angular);
(function(angular){
'use strict';
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
})(window.angular);
(function(angular){
'use strict';
angular.module("aqtApp").config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
        'APP_NAME': "Question's Advisor",
        'LB_LOGIN_TITLE': 'Login in with account Stack Overflow in Portuguese',
        'BT_AUTHORIZE': 'AUTHORIZE',
        'LB_MAIN_TITLE': 'My Questions',
        'BT_MAIN_AUTH': 'Follow',
        'LB_NQ_TITLE': 'Write your programming question',
        'LB_NQ_QUESTION_TITLE': 'Question title',
        'LB_NQ_QUESTION_TAG': 'Question tags',
        'BT_POST': 'POST QUESTION',
        'MSG_TOAS_CONFIRM': 'Question publised!'

    });

    $translateProvider.translations('pt', {
        'APP_NAME': "Question's Advisor",
        'LB_LOGIN': 'Login com sua conta do Stack Overflow em Português',
        'BT_AUTHORIZE': 'AUTORIZAR',
        'LB_MAIN_TITLE': 'Minhas Perguntas',
        'BT_MAIN_AUTH': 'Acompanhar',
        'LB_NQ_TITLE': 'Escreva sua Pergunta de Programação',
        'LB_NQ_QUESTION_TITLE': 'Título da Pergunta',
        'LB_NQ_QUESTION_TAG': 'Tags da pergunta',
        'BT_POST': 'PUBLICAR PERGUNTA',
        'MSG_TOAS_CONFIRM': 'Pergunta postada com sucesso!'
    });

    $translateProvider.preferredLanguage('en');
}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc value
 * @name AQT Value
 *
 * @description
 * This is major value this app.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").value("aqtValue", {

    api: "http://localhost:8080/",

    so: {
        site: 'pt.stackoverflow',
        api: 'https://api.stackexchange.com/2.2/',
        test: 'https://stackexchange.com/oauth/dialog?client_id=7061&scope=no_expiry&redirect_uri=https://appif.herokuapp.com/#/main',
        clientId: 7786,
        scopeList: ['read_inbox'],
        key: 'KJi1v7aNWJ8aziMts2QEmQ((',
        channelUrl: 'https://appif.herokuapp.com/#/blank'
    }
});
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc controller
 * @name login controller
 *
 * @description
 * This is the login controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("loginController", ["$location", "aqtValue", function($location, aqtValue) {

    var vm = this;

    initSO();

    vm.login = function() {
        console.log('tenta fazer login...');
        SE.authenticate({
            success: function(data) {
                console.log('Success :', data);
                $location.path('/main');
            },
            error: function(data) {
                console.log('Error: ', data);
            },
            networkUsers: true
        });
    }

    function initSO() {
        $(function() {
            SE.init({
                clientId: aqtValue.so.clientId,
                key: aqtValue.so.key,
                channelUrl: aqtValue.so.channelUrl,
                complete: function(data) {
                    console.log('Init: ', data);
                }
            });
        });
    };

}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc service
 * @name login Service
 *
 * @description
 * This is the login service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
// angular.module("components").factory("loginService", function($http, aqtValue) {
//
//     var _login = function() {
//         return $http.jsonp(aqtValue.so.test).then(function(response) {
//             callback(response.data);
//         });
//     };
// };
//
// return {
//     login: _login
// }
//
// });
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc controller
 * @name Main controller
 *
 * @description
 * This is the main controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("mainController", ["$scope", function($scope) {


}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc controller
 * @name question controller
 *
 * @description
 * This is the new question controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("newQuestionController", ["questionService", "$scope", "$location", function(questionService, $scope, $location) {

    var vm = this;

    vm.question = {};
    vm.tags = [];
    vm.suggestions = [];
    vm.open = false;

    vm.register = function() {
        vm.question.tags = [];
        questionService.getSuggestions(vm.question, function(response) {
            vm.suggestions = response;

            if (vm.suggestions.length) {
                vm.open = true;
                $('#suggestionsModal').modal('open');
            }
            if (!vm.open) {
                $location.path("/main")
                Materialize.toast("Pergunta Publicada com  sucesso", 3000);
            }
        });
    };

    var postQuestion = function(question) {
        questionService.postQuestion(question, function(response) {});
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
}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc service
 * @name question Service
 *
 * @description
 * This is the question service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").factory("questionService", ["$http", "aqtValue", function($http, aqtValue) {

    var _getSuggestions = function(question, callback) {
        return $http.post(aqtValue.api + "analyzerOnly", question).then(function(response) {
            callback(response.data);
        });

    };

    var _postQuestion = function(question, callback) {
        var config = {
            params: {
                title: question.title,
                body: question.description,
                tags: question.tags,
                site: aqtValue.so.site,
                key: aqtValue.so.key,
                preview: true,
                filter: 'default',
                run: true
            }
        }

        return $http.jsonp(aqtValue.so.api + 'questions/add', config).then(function(response) {
            callback(response.data);
        });

    };

    return {
        getSuggestions: _getSuggestions,
        postQuestion: _postQuestion
    }

}]);;
})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./floating-button.component.html','<div class="fixed-action-btn"><a ng-href="{{$ctrl.url}}" class="btn-floating btn-large waves-effect waves-light red"><i class="large material-icons">{{$ctrl.icon}}</i></a></div>');
$templateCache.put('./navBar.component.html','<nav class="navbar-fixed cyan darken-2"><div class="nav-wrapper"><a href="#/" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a> <a href="#/" data-activates="slide-out" class="brand-logo center button-collapse">{{$ctrl.name | translate}}</a><ul class="right"><li><a href="#/"><i class="material-icons">more_vert</i></a></li></ul></div></nav>');
$templateCache.put('./suggestions.component.html','<div ng-show="$ctrl.open" {{$ctrl.open}}><div id="suggestionsModal" class="modal bottom-sheet"><div class="modal-content"><div class="row"><div class="col s12"><h4><small>Dicas para melhorar sua pergunta</small></h4></div></div><ul class="collection"><li class="collection-item" ng-repeat="sug in $ctrl.suggestions"><span class="title"><b>{{sug.header}}</b></span><br><span ng-repeat="m in sug.subHeaders"><i>{{m}}</i><br></span></li></ul></div></div></div>');
$templateCache.put('./blank.html','');
$templateCache.put('./login.html','<div class="section"></div><div class="section"></div><div class="container"><center><img class="responsive-img" style="width: 300px" src="../assets/img/so-logo.png"><h4><small>{{ \'LB_LOGIN_TITLE\' | translate }}</small></h4></center><div class="section"></div><form class="col s12"><div class="row"><a name="btn_login" href="https://stackexchange.com/oauth/dialog?client_id=7061&scope=no_expiry&redirect_uri=https://stackexchange.com/oauth/login_success" id="btn-auth" class="col s12 btn btn-large waves-effect yellow darken-3">AUTHORIZE</a></div></form></div>');
$templateCache.put('./main.html','<center><h4>{{ \'LB_MAIN_TITLE\' | translate }}</h4></center><div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">Qual a diferen\xE7a de uma toolbar para uma action bar?</span><p class="card-subtitle"><a href="#"><span class="new badge" data-badge-caption="java"></span></a> <a href="#"><span class="new badge" data-badge-caption="android"></span><a></a></p></div><div align="center" class="card-action"><a href="#">{{ \'BT_MAIN_AUTH\' | translate }}</a></div></div></div></div><div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">Qual a diferen\xE7a entre spring e JavaEE?</span><p class="card-subtitle"><a href="#"><span class="new badge" data-badge-caption="java"></span></a></p></div><div align="center" class="card-action"><a href="#">{{ \'BT_MAIN_AUTH\' | translate }}</a></div></div></div></div><btn-fb url="\'#/new\'" icon="add"></btn-fb>');
$templateCache.put('./new-question.html','<div class="container"><center><h5>{{ \'LB_NQ_TITLE\' | translate }}</h5></center><form class="col s12" name="nqForm" ng-submit="nqForm.$valid && nqCtrl.register()" role="form" novalidate><div class="row"><div class="col s12"></div></div><div class="row"><div class="input-field col s12"><input class="validate" type="text" name="title" ng-model="nqCtrl.question.title" id="title"><label for="title">{{ \'LB_NQ_QUESTION_TITLE\' | translate }}</label></div></div><div class="row"><div class="input-field col s12"><simple-mde id="description" ng-model="nqCtrl.question.description" class="materialize-textarea language-css"></simple-mde></div></div><div class="row"><div class="input-field col s12"><div id="tag" aqtchip ng-model="nqCtrl.tags" placeholder="Question tag" secondary-placeholder="Question tag"></div></div></div><br><div class="row"><div class="input-field col s12"><button id="postQuestion" class="col s12 btn btn-large waves-effect cyan darken-2">{{ \'BT_POST\' | translate }}</button></div></div><suggestions-modal suggestions="nqCtrl.suggestions" open="nqCtrl.open"></suggestions-modal></form></div>');}]);})(window.angular);