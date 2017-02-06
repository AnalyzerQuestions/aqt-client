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
        clientId: 8955,
        scopeList: ['read_inbox'],
        key: 'bvot7qoa6k1gD4UfXAfYJA((',
        channelUrl: 'https://appif.herokuapp.com/#/blank'
    }
});
