// put in your new server here!
// example: http://api.elephorum.com
var SERVERPATH = 'http://localhost/web-tool-railroad-api/';

// here you have to fill in the path where the api is called
// usually it runs on "public/api/v1"
var APIPATH = 'public/api/v1';

var CONSTANT = {
    "COOKIE": {
        "TOKEN": "tkn_u", // tkn_u = token_user
        "USER_ID": "u_i", // u_i = user_id
        "PREFLANGUAGE": "p_lang",
        "COOKIE_ACCEPT": "c_a",
    },
    // Picture location default
    "PICTURE_LOCATION_PREFIX": SERVERPATH,
    "API_PATH": SERVERPATH + APIPATH,

    // Profile Picture Constants
    "PROFILE_PICTURE_DEFAULT": "https://jpeer.at/railroad/testimage/person-default-flat.png",
    "PROFILE_PICTURE_ALT_DEFAULT": "Default profile picture",
};

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
    'ngMaterial',
    'tmh.dynamicLocale',
    'ui.select',
    'ngSanitize',
    'ngFileUpload',
    'ngPassword',
    'ngMessages',
]);

angular
    .module('railroad')
    .config(config)
    .run(run)
    // cosntant CONSTANT is used for the tokens
    .constant("CONSTANT", CONSTANT);

// config method
config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    'localStorageServiceProvider',
    '$translateProvider',
    'RestangularProvider', // restangular
    '$mdThemingProvider',
    'tmhDynamicLocaleProvider'
];

function config ($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider, RestangularProvider, $mdThemingProvider, tmhDynamicLocaleProvider) {
    // workaround to enable cookies in config
    var $cookies;

    angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
        $cookies = _$cookies_;
    }]);

    // redirect to home state when we call the page without route information
    // activate in proudction and set mod_rewrite to index.html
    $locationProvider.html5Mode(true);

    // setup restangular basics
    RestangularProvider.setBaseUrl(CONSTANT.API_PATH)
    .setDefaultHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+ $cookies.get('tkn_u')
    });

    $mdThemingProvider.definePalette('railroad', {
        '50': 'FFCA57',
        '100': 'ffffff',
        '200': 'ffffff',
        '300': 'ffffff',
        '400': 'ffffff',
        '500': 'FFCA57',
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
    });
    $translateProvider.useMissingTranslationHandler(); // log if TRANSLATION_CODE not found
    $translateProvider.preferredLanguage('en-us');
    $translateProvider.fallbackLanguage('en-us');
    tmhDynamicLocaleProvider.localeLocationPattern('/i18n/angular/angular-locale_{{ locale }}.js');

    $urlRouterProvider.when('', '/welcome');
    $urlRouterProvider.otherwise('/error');

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
                        return auth.authorize();
                    }
                ]
            },
            template: '<div class="view-header" data-ui-view="header"></div><div class="row small-up-1 medium-up-1 large-up-1"><div class="view-main column" data-ui-view="main"></div></div><div class="view-footer" data-ui-view="footer"></div>'
        })
        .state('secure.index', {
            url: '/',
            data: {
                activetab: 'home',
                roles: ['user'],
                roleLimit: 4
            },
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/home/home.html',
                    controller: 'HomeCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
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
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'category',
                roleLimit: 4
            },
        })
        .state('secure.category', {
            url: '/category/{id}',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/subcategory/subcategory.html',
                    controller: 'SubcategoryCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'category',
                roleLimit: 4
            }
        })
        .state('secure.topic', {
            url: '/topic/{id}',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/topic/topic.html',
                    controller: 'TopicCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'category',
                roleLimit: 4
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
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'profile',
                roleLimit: 4
            }
        })
        .state('secure.company', {
            url: '/company/{id}',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/company/company.html',
                    controller: 'CompanyCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'profile',
                roleLimit: 4
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
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'rules',
                roleLimit: 4
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
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                activetab: 'faq',
                roleLimit: 4
            }
        })
        .state('secure.admin', {
            url: '/admin',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/admin/admin.html',
                    controller: 'AdminCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                admintab: true,
                activeadmintab: 'home',
                roleLimit: 3
            }
        })
        .state('secure.adminUsermanagement', {
            url: '/admin/usermanagement',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    template: '<admin-user-request>'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                admintab: true,
                activeadmintab: 'usermanagement',
                roleLimit: 3
            }
        })
        .state('secure.companymanagement', {
            url: '/admin/companymanagement',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    template: '<company-management>'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                admintab: true,
                activeadmintab: 'companymanagement',
                roleLimit: 3
            }
        })
        .state('secure.jobmanagement', {
            url: '/admin/jobmanagement',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    template: '<job-management>'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                admintab: true,
                activeadmintab: 'jobmanagement',
                roleLimit: 3
            }
        })
        .state('rules', {
            url: '/nologin/rules',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/rules/rules.html',
                    controller: 'RulesCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                breadcrumbs: false
            }
        })
        .state('faq', {
            url: '/nologin/faq',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/faq/faq.html',
                    controller: 'FaqCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                breadcrumbs: false
            }
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
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                roleLimit: 0
            }
        })
        .state('signup', {
            url: '/signup',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/signup/signup.html',
                    controller: 'SignupCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                roleLimit: 0
            }
        })
        .state('signupToken', {
            url: '/signup/{token}',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/signup/signup.html',
                    controller: 'SignupCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                roleLimit: 0
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
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                roleLimit: 0
            }
        })
        .state('legal', {
            url: '/legal',
            views: {
                header: {
                    templateUrl: templates.header.template,
                    controller: templates.header.controller
                },
                main: {
                    templateUrl: 'pages/legalpolicy/legalpolicy.html',
                    controller: 'LegalpolicyCtrl'
                },
                footer: {
                    templateUrl: templates.footer.template,
                    controller: templates.footer.controller
                },
            },
            data: {
                roleLimit: 0
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
    '$stateParams',
    '$window'
];

function run($rootScope, $location, $http, auth, user, Restangular, $stateParams, $window) {

    $rootScope.getDate = function (date) {
        return date === null ? date : new Date(date);
    }

    $rootScope.isLoggedIn = function() {
        return user.isAuthenticated();
    }

    $rootScope.setDefaultPictureLocation = function (data) {
        if (!data.picture_location || data.picture_location === '/path/to/picture/') {
            data.picture_location = CONSTANT.PROFILE_PICTURE_DEFAULT;
            data.picture_alt = CONSTANT.PROFILE_PICTURE_ALT_DEFAULT;
        } else if ((data.picture_location).indexOf('data.picture_location') > 0) {
            data.picture_location = CONSTANT.PICTURE_LOCATION_PREFIX + data.picture_location;
        }

        return data;
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        // redirect to login page if not logged in and trying to access a restricted page
        if (user.isIdentityResolved()) {
            auth.authorize();
        }

    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        if (response.status === 401) {

            if (user.isIdentityResolved()) {
                auth.logout();
                $location.path('/error');
                return false;
            }

            return true;

        }

        if (response.status === 404) {
            $location.path('/error');

            return false; // error handled
        }

        return true; // error not handled
    });
}

angular.element(document).ready(function() {
    angular.bootstrap(document, ['railroad']);
});
