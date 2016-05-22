// ----------------------------------------------------------------------------
// fs controller
filemanager.controller( 'filemanager.manageAccount', ['$scope', '$http', '$translate', '$mdToast', function( $scope, $http, $translate, $mdToast ) {
    $scope.users = [];

    // ----------------------------------------------------------------------------
    // get users
    $scope.getUsers = function() {
        $http.get( 'users' ).then( function( res ) {
            $scope.users = res.data;
            $scope.user  = null;
        }, function() {
            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });
    };

    // ----------------------------------------------------------------------------
    // select
    $scope.select = function( $index ) {
        $scope.user = $scope.users[$index];
    };

    // ----------------------------------------------------------------------------
    // add
    $scope.add = function() {
        $scope.users.push({});
        $scope.select( $scope.users.length -1 );
    };

    // ----------------------------------------------------------------------------
    // remove
    $scope.remove = function( $index ) {
        $http.delete( 'users/' + $scope.users[$index]._id ).then( function() {
            $scope.getUsers();
        }, function() {
            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });
    };

    // ----------------------------------------------------------------------------
    // save
    $scope.save = function() {
        if( $scope.user._id ) {
            $http.put( 'users', $scope.user ).then( function() {
                $scope.getUsers();
            }, function() {
                $translate( 'request.failure' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                });
            });
        } else {
            $http.post( 'users', $scope.user ).then( function() {
                $scope.getUsers();
            }, function() {
                $translate( 'request.failure' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                });
            });
        }

        return false;
    };

    // ----------------------------------------------------------------------------
    // init
    $scope.getUsers();
}]);