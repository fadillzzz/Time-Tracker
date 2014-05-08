describe('Time Tracker Services', function ()
{
    beforeEach(module('TimeTrackerModel'));
    beforeEach(module('TimeTrackerServices'));

    describe('PlayerRepository', function () 
    {
        it('should add new players', inject(function (PlayerRepository)
        {
            var playerList;

            playerList = PlayerRepository.addPlayer('new player');

            expect(PlayerRepository.getPlayers().length).toEqual(1);
            expect(playerList[0].getName() == 'new player').toEqual(true);

            playerList = PlayerRepository.addPlayer('another new player');

            expect(PlayerRepository.getPlayers().length).toEqual(2);
            expect(playerList.map(function (player) { return player.getName(); })).toContain('another new player');
        }));

        it('should not add existing players', inject(function (PlayerRepository)
        {
            PlayerRepository.addPlayer('new player');

            expect(PlayerRepository.getPlayers().length).toEqual(1);

            PlayerRepository.addPlayer('new player');

            expect(PlayerRepository.getPlayers().length).toEqual(1);
        }));

        it('should remove existing players', inject(function (PlayerRepository)
        {
            PlayerRepository.addPlayer('new player');
            PlayerRepository.addPlayer('another new player');

            expect(PlayerRepository.getPlayers().length).toEqual(2);

            PlayerRepository.removePlayer('new player');

            expect(PlayerRepository.getPlayers().length).toEqual(1);

            PlayerRepository.removePlayer('another new player');

            expect(PlayerRepository.getPlayers().length).toEqual(0);
        }));

        it('should not remove non-existent players', inject(function (PlayerRepository)
        {
            PlayerRepository.addPlayer('new player');

            expect(PlayerRepository.getPlayers().length).toEqual(1);

            PlayerRepository.removePlayer('no one');

            expect(PlayerRepository.getPlayers().length).toEqual(1);
        }));

        it('should return a list of players', inject(function (PlayerRepository)
        {
            var playerList = PlayerRepository.addPlayer('new player');

            expect(playerList).toBe(PlayerRepository.getPlayers());
        }));
    });
});