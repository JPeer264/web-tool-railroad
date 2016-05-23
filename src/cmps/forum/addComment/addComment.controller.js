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

    $scope.addComment=function(){
        comment.create($state.params.id,$scope.comment).then(function(data) {
            // added by jpeer
            // async push and apply to scope
            $scope.comment.user = $scope.currentUser;
            $scope.comment.created_at = (new Date());

            $scope.topic.comment.push($scope.comment);
        });
        $('#addComment').foundation('close');
    }

     $scope.close=function (){
         $scope.comment=null;
     }
}
