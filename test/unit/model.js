describe('Time Tracker Model', function ()
{
    beforeEach(module('TimeTrackerModel'));

    describe('PlayTime', function ()
    {
        var playTime, interval;

        beforeEach(inject(function (PlayTime, _$interval_)
        {
            playTime = new PlayTime();
            interval = _$interval_;
        }));

        it('should increase play time by each second', function ()
        {
            playTime.start();

            expect(playTime.isRunning()).toEqual(true);

            for (var i = 0; i < 10; i++) {
                interval.flush(1000);
                expect(playTime.getPlayTimeInSeconds()).toEqual(i + 1);
            }
        });

        it('should not increase play time when stopped', function ()
        {
            expect(playTime.isRunning()).toEqual(false);

            for (var i = 0; i < 10; i++) {
                interval.flush(1000);
                expect(playTime.getPlayTimeInSeconds()).toEqual(0);
            }
        });

        it('should be able to return the total play time in hours, minutes, and seconds', function ()
        {
            playTime.start();

            interval.flush(3789000);

            expect(playTime.getPlayTime()).toEqual(['01', '03', '09']);
            expect(playTime.getHours()).toEqual('01');
            expect(playTime.getMinutes()).toEqual('03');
            expect(playTime.getSeconds()).toEqual('09');
        });
    });

    describe('Points', function ()
    {
        var points, interval;

        beforeEach(inject(function (Points, _$interval_)
        {
            points = new Points();
            interval = _$interval_;
        }));

        it('should increase points collected by each second', function ()
        {
            points.start();

            for (var i = 0; i < 10; i++) {
                interval.flush(1000);
                expect(points.getPoints()).toEqual((i + 1) / 3600);
            }
        });

        it('should not increase points when stopped', function ()
        {
            interval.flush(500000);

            expect(points.getPoints()).toEqual(0);
        });

        it('shoud increase points according to the specified multiplier', function ()
        {
            var currentPoints = 0;

            points.start();
            points.increaseMultiplier();

            for (var i = 0; i < 10; i++) {
                interval.flush(1000);
                currentPoints += 2 / 3600; 
                expect(points.getPoints()).toBeCloseTo(currentPoints);
            }

            points.decreaseMultiplier();

            for (var i = 0; i < 10; i++) {
                interval.flush(1000);
                currentPoints += 1 / 3600;
                expect(points.getPoints()).toBeCloseTo(currentPoints);
            }
        });

        it('should increase points on demand', function ()
        {
            points.increasePointBy(1);

            expect(points.getPoints()).toEqual(1);

            points.increasePointBy(2);

            expect(points.getPoints()).toEqual(3);
        });
    });

    describe('Player', function ()
    {
        var player, otherPlayer;

        beforeEach(inject(function (Player)
        {
            player = new Player('a player');
            otherPlayer = new Player('other player');
        }));

        it('should be able to clock in and clock out', function ()
        {
            player.clockIn();

            expect(player.isClockedIn()).toEqual(true);

            player.clockOut();

            expect(player.isClockedIn()).toEqual(false);
        });

        it('should have the right name', function ()
        {
            expect(player.getName()).toEqual('a player');
            expect(otherPlayer.getName()).toEqual('other player');
        });

        it('should have an instance of PlayTime and Points', function ()
        {
            expect(player.getTime()).not.toBeNull();
            expect(player.getPoints()).not.toBeNull();
        });
    });
});