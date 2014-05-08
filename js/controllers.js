var TimeTrackerControllers = angular.module('TimeTrackerControllers', []);

TimeTrackerControllers.controller('AddPlayerController', [
    '$scope',
    'PlayerRepository',
    function ($scope, PlayerRepository)
    {
        $scope.addPlayer = function (player)
        {
            if (player) {
                PlayerRepository.addPlayer($scope.player);
            }

            $scope.player = '';
        };
    }
]);

TimeTrackerControllers.controller('PlayerListController', [
    '$scope',
    'PlayerRepository',
    function ($scope, PlayerRepository)
    {
        $scope.players = PlayerRepository.getPlayers();

        $scope.$on('playerChanges', function (e, playerList)
        {
            $scope.players = playerList;
        });

        $scope.removePlayer = function(player)
        {
            PlayerRepository.removePlayer(player);
        };
    }
]);