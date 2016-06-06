angular
    .module('forum.addComment')
    .controller('AddCommentCtrl', AddCommentController);

/**
 * @ngdoc controller
 * @name cmps.forum:AddCommentCtrl
 *
 * @requires $scope
 * @requires service.comment
 * @requires $state

 * @description
 * AddCommentCtrl for the addComment Component
 */
AddCommentController.$inject = [
    '$scope',
    'comment',
    '$state',
];

function AddCommentController($scope, comment, $state) {
    var vm = this;
    vm.currentUser = $scope.$root.currentUser;
    vm.triggeredComment = false;

    vm.addComment=function(){
        vm.triggeredComment = true;

        comment.create($state.params.id,vm.comment).then(function(data) {
            // async push and apply to scope
            vm.comment.user = vm.currentUser;
            vm.comment.created_at = (new Date());

            $scope.$parent.topic.comment.push(vm.comment);
            vm.comment = null;

            vm.triggeredComment = false;
            $('#addComment').foundation('close');
        });
    }

    vm.close = function () {
        vm.comment = null;
    }
}
