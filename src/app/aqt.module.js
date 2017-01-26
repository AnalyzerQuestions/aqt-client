/**
 * @ngdoc module
 * @name aqtApp
 *
 * @description
 * This is the aqtApp module. It is the major module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("aqtApp", ['ngRoute', 'components', 'templates', 'common', 'pascalprecht.translate']);


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
