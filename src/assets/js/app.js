angular.module('railroad', [
    'ui.router',
    'LocalStorageModule',
    'railroad.templates',
    'pages',
    'service',
    'cmps'
]);
angular
    .module('railroad')
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        function($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider) {
            //redirect to home state when we call the page without route information
            // $locationProvider.html5Mode(true);

            $urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('index', {
                    url: '/',
                    views: {
                        main: {
                            templateUrl: 'pages/home/home.html',
                            controller: 'homeCtrl'
                        }
                    }
                });

            localStorageServiceProvider
                .setPrefix('railroad')
                .setStorageType('localStorage');
        },

    ]);

    angular.element(document).ready(function() {
    angular.bootstrap(document, ['railroad']);
});
