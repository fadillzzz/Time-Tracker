describe('Time Tracker Controllers', function ()
{ 
    beforeEach(module('TimeTracker'));
    
    describe('AddPlayerController', function ()
    {
        var scope, controller;

        beforeEach(inject(function ($rootScope, $controller)
        {
            scope = $rootScope.$new();
            controller = $controller('AddPlayerController', {$scope: scope});
        }));

        it('should add a new player', inject(function (PlayerRepository)
        {
            expect(PlayerRepository.getPlayers().length).toEqual(0);

            scope.addPlayer('new player');
            expect(PlayerRepository.getPlayers().length).toEqual(1);

            scope.addPlayer('another new player');
            expect(PlayerRepository.getPlayers().length).toEqual(2);
        }));

        it('should clear the player name input after adding a player', function ()
        {
            scope.player = 'new player';
            scope.addPlayer('new player');

            expect(scope.player).toEqual('');
        });
    });

    describe('PlayerListController', function ()
    {
        var scope, controller;

        beforeEach(inject(function ($rootScope, $controller)
        {
            scope = $rootScope.$new();
            controller = $controller('PlayerListController', {$scope: scope});
        }));

        it('should update the player list in the scope', inject(function (PlayerRepository)
        {
            expect(scope.players.length).toEqual(0);

            PlayerRepository.addPlayer('new player');

            expect(scope.players.length).toEqual(1);
            expect(scope.players[0].getName() == 'new player').toEqual(true);
        }));

        it('should remove a player from the list', inject(function (PlayerRepository) {
            PlayerRepository.addPlayer('new player');

            expect(scope.players.length).toEqual(1);

            scope.removePlayer('new player');

            expect(scope.players.length).toEqual(0);
        }));
    });
});