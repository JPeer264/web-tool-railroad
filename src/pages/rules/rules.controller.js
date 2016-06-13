angular
	.module('pages.rules')
	.controller('RulesCtrl', RulesController);

/**
 * @ngdoc controller
 * @name pages.rules:RulesCtrl
 *
 * @requires $scope
 *
 * @description
 * RulesCtrl for the rules page
 */
RulesController.$inject = [
	'$scope',
    '$translate',
];

function RulesController($scope, $translate) {
    $scope.rules = [
        'Search the other posts to see if your topic is already covered.',
        'If you want a category added, or if you have some notes or feedback on how the forum works, please contact an admin.',
        'Use a meaningful title for your thread, it will be easier to find for other users.',
        'Is possible to add information, documents and images, but do not post content that violates a copyright.',
        'Stay on topic, ask only relevant questions for the (sub)category you are in.',
        'Do not double post (post the same message twice in one thread) or cross post (place the same message across several forums).',
        'Do not post new problems on someone else\'s thread and interrupt a topic of discussion.',
        'Only post responses when you have something to contribute. Try not post ‘empty’ or useless responses.',
        'Do not use words like \'urgent\' or \'important\' in your subject line, be patient.',
        'Do not use all caps or SHOUT in your posts. In addition, one exclamation point is enough.',
        'Be Kind. Strong differences should be handled through by email or private chat and not through posts displayed to everyone.',
    ]
}