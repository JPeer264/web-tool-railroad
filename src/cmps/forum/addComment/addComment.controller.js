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
        vm.comment.content = (vm.comment.content).replace(/^\n+/, '').replace(/\n+/g,'\n\n');
        console.log(vm.files);
        var fd = new FormData();
        fd.append("content", vm.comment.content);
        angular.forEach(vm.files, function (file, key) {
             fd.append('file_'+key, file);
        });
        comment.create($state.params.id, fd).then(function(data) {
            // async push and apply to scope
            vm.comment.user = vm.currentUser;
            vm.comment.created_at = (new Date());

            $scope.$parent.topic.comment.push(vm.comment);
            vm.comment = null;
            vm.files = null;
            vm.errfiles = null;

            vm.triggeredComment = false;
            $('#addComment').foundation('close');
        }).catch(function (data) {
            if(data.status==409){
                $scope.commentForm.content.$setValidity("exists", false);
            }
            vm.triggeredComment = false;
        });
    }

    vm.close = function () {
        vm.comment = null;
        vm.files = null;
        vm.errfiles = null;
    }

    vm.addFiles = function (files, errfiles){
        vm.files = files;
        vm.errfiles = errfiles;
    }

    vm.removeFile = function (filetoremove){
        console.log('in remove');
        angular.forEach(vm.files, function (file, key) {
             if(filetoremove === file){
                console.log(vm.files);
                console.log(vm.files.splice(key, 1));
             }
        });
    }
}
