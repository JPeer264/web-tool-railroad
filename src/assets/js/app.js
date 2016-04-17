angular.module('railroad', [
    'ui.router',
    'LocalStorageModule',
    'railroad.templates',
    'pages',
    'service',
    'cmps',
    'pascalprecht.translate',
    'restangular',
    'ngCookies'
]);

angular
    .module('railroad')
    .config(config)
    .run(run)
    // cosntant COOKIE is used for the tokens
    .constant("COOKIE", {
        "TOKEN": "tkn_u", // tkn_u = token_user
        "USER_ID": "u_i" // u_i = user_id
    });

    // config method
    config.$inject = [
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        '$translateProvider',
        'RestangularProvider', // restangular
    ];

    function config ($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider, RestangularProvider) {
        // redirect to home state when we call the page without route information
        // activate in proudction and set mod_rewrite to index.html
        //$locationProvider.html5Mode(true);

        // setup restangular basics
        RestangularProvider.setBaseUrl('http://localhost/web-tool-railroad-api/public/api/v1/')
        .setDefaultHeaders({'Content-Type': "application/x-www-form-urlencoded"})
        .setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
            return {
                element: element,
                params: params,
                headers: headers,
                httpConfig: _.extend({paramSerializer: '$httpParamSerializerJQLike'}, httpConfig)
            };
        });

        // activate translation
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',// path to translations files
            suffix: '.json'// suffix, currently- extension of the translations
        })
        .useMissingTranslationHandlerLog() // log if TRANSLATION_CODE not found
        .preferredLanguage('en_US')
        .fallbackLanguage('en_US');

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

        // setup header and footer templates
        var templates = {
            header: {
                template: 'pages/header/header.html',
                controller: 'HeaderCtrl'
            },
            footer: {
                template: 'pages/footer/footer.html',
                controller: 'FooterCtrl'
            },
        }

        $stateProvider
            .state('secure', {
                abstract: true,
                resolve: {
                    authorize: ['authorization',
                        function(authorization) {
                            return authorization.check();
                        }
                    ]
                },
                template: '<div class="view-header" data-ui-view="header"></div><div class="view-main" data-ui-view="main"></div>'
            })
            .state('secure.index', {
                url: '/',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/home/home.html',
                        controller: 'HomeCtrl'
                    },
                }
            })
            .state('secure.categories', {
                url: '/category',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/categories/categories.html',
                        controller: 'CategoriesCtrl'
                    },
                }
            })
            .state('secure.category', {
                url: '/category/{id}',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/category/category.html',
                        controller: 'CategoryCtrl'
                    },
                }
            })
            .state('secure.profile', {
                url: '/user/{id}',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/profile/profile.html',
                        controller: 'ProfileCtrl'
                    },
                }
            })
            .state('secure.rules', {
                url: '/rules',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/rules/rules.html',
                        controller: 'RulesCtrl'
                    },
                }
            })
            .state('secure.faq', {
                url: '/faq',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/faq/faq.html',
                        controller: 'FaqCtrl'
                    },
                }
            })
            .state('landing', {
                url: '/welcome',
                views: {
                    header: {
                        templateUrl: 'pages/header/header.html',
                        controller: 'HeaderCtrl'
                    },
                    main: {
                        templateUrl: 'pages/landing/landing.html',
                        controller: 'LandingCtrl'
                    }
                }
            });

        localStorageServiceProvider
            .setPrefix('railroad')
            .setStorageType('localStorage');
    };

    // run method
    run.$inject = [
        '$rootScope', 
        '$location',
        '$http',
        'authorization'
    ];
    
    function run($rootScope, $location, $http, authorization) {
        authorization.check();
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var loggedIn = authorization.isAuthorized();

            // if you do not want to enable the login 
            // deavticte the following 2 if
            if (!loggedIn) {
                $location.path('/welcome');
            }

            // redirect if logged in user wants to /welcome
            if (loggedIn && $location.url() == '/welcome') {
                $location.path('/');
            }
        });
    }

    angular.element(document).ready(function() {
    angular.bootstrap(document, ['railroad']);
});
