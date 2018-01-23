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

    api: "https://aqt.herokuapp.com/",

    so: {
        siteUrl: 'https://pt.stackoverflow.com',
        site: 'pt.stackoverflow',
        api: 'https://api.stackexchange.com/2.2/',
        clientId: 8955,
        scopeList: ['read_inbox', 'no_expiry', 'write_access'],
        key: 'bvot7qoa6k1gD4UfXAfYJA((',
        channelUrl: 'https://appif.herokuapp.com/#/blank'
    }
});
