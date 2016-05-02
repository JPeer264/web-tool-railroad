angular.module('railroad', [
    'ui.router',
    'LocalStorageModule',
    'railroad.templates',
    'pages',
    'service',
    'cmps',
    'pascalprecht.translate',
    'restangular',
    'ngCookies',
    'ngMaterial'
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
        '$mdThemingProvider'
    ];

    function config ($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider, RestangularProvider, $mdThemingProvider) {
        // workaround to enable cookies in config
        var $cookies;

        angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
            $cookies = _$cookies_;
        }]);

        // redirect to home state when we call the page without route information
        // activate in proudction and set mod_rewrite to index.html
        // $locationProvider.html5Mode(true);

        // setup restangular basics
        RestangularProvider.setBaseUrl('http://localhost/web-tool-railroad-api/public/api/v1/')
        .setDefaultHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + $cookies.get('tkn_u')
        });

        $mdThemingProvider.definePalette('railroad', {
            '50': 'FFC14E',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'FFC14E',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8980',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
        });
          $mdThemingProvider.theme('default')
            .primaryPalette('railroad')
        

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
                    authorize: ['auth',
                        function(auth) {
                            return auth.check();
                        }
                    ]
                },
                template: '<div class="view-header" data-ui-view="header"></div><div class="row"><div class="view-main" data-ui-view="main"></div></div>'
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
                },
                activetab: 'home'
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
                },
                activetab: 'category'
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
                },
                activetab: 'category'
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
                },
                activetab: 'profile'
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
                },
                activetab: 'rules'
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
                },
                activetab: 'faq'
            })
            .state('landing', {
                url: '/welcome',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/landing/landing.html',
                        controller: 'LandingCtrl'
                    }
                }
            })
            .state('error', {
                url: '/error',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/error/error.html',
                        controller: 'ErrorCtrl'
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
        'auth',
        'user',
        'Restangular',
    ];
    
    function run($rootScope, $location, $http, auth, user, Restangular) {
        auth.check();
        // todo put setCurrent into auth service
        user.setCurrent();
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var loggedIn = auth.isAuthorized();

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

        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            // if(response.status >= 300) {
            //     $location.path('/error');

            //     return false; // error handled
            // }

            return true; // error not handled
        });
    }

    angular.element(document).ready(function() {
    angular.bootstrap(document, ['railroad']);
});
