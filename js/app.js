var TimeTracker = angular.module('TimeTracker', [
    'ngRoute',
    'TimeTrackerModel',
    'TimeTrackerControllers',
    'TimeTrackerServices',
]);

TimeTracker.config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.when('/list', {
        templateUrl: 'templates/player_listing.html',
        controller: 'PlayerListController'
    }).when('/add', {
        templateUrl: 'templates/add_player.html',
        controller: 'AddPlayerController'
    }).otherwise({
        redirectTo: '/list'
    });
}]);

TimeTracker.run(['$rootScope', '$location', function ($rootScope, $location)
{
    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.activeLink = $location.path() === '/list';
    });
}]);