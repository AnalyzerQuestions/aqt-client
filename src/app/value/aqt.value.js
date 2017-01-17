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
        clientId: 7786,
        scopeList: ['write_access'],
        key: 'KJi1v7aNWJ8aziMts2QEmQ((',
        channelUrl: 'https://appif.herokuapp.com/#/blank'
    }
});
