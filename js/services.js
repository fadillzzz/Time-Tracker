var TimeTrackerServices = angular.module('TimeTrackerServices', []);

TimeTrackerServices.service('PlayerRepository', [
    '$rootScope',
    'Player',
    function ($rootScope, Player)
    {
        var playerList = [];

        this.addPlayer = function(player)
        {
            if (locatePlayer(player) === false) {
                player = new Player(player);
                playerList.push(player);
            }

            $rootScope.$broadcast('playerChanges', playerList);

            return playerList;
        };

        this.getPlayers = function()
        {
            return playerList;
        };

        this.removePlayer = function (player)
        {
            var index = locatePlayer(player);

            if (index !== false) {
                playerList[index].clockOut();

                playerList = playerList.slice(0, index).concat(
                    playerList.slice(index + 1, playerList.length)
                );

                $rootScope.$broadcast('playerChanges', playerList);
            }

            return playerList;
        };

        function locatePlayer(player)
        {
            var i = 0,
                l = playerList.length;

            for (; i < l; i++) {
                if (playerList[i].getName() === player) {
                    return i;
                }
            }

            return false;
        }
    }
]);