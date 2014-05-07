var TimeTrackerModel = angular.module('TimeTrackerModel', []);

TimeTrackerModel.factory('PlayTime', ['$interval', function ($interval)
{
    return function ()
    {
        var time = 0,
            promise = null;

        this.getPlayTime = function ()
        {
            return parseTime(this.getPlayTimeInSeconds());
        };

        this.getHours = function ()
        {
            return this.getPlayTime()[0];
        };

        this.getMinutes = function ()
        {
            return this.getPlayTime()[1];
        };

        this.getSeconds = function ()
        {
            return this.getPlayTime()[2];
        };

        this.getPlayTimeInSeconds = function ()
        {
            return time;
        };

        this.start = function ()
        {
            promise = $interval(increasePlayTime, 1000);
        };

        this.stop = function ()
        {
            if (promise) {
                $interval.cancel(promise);
                promise = null;
            }
        };

        this.isRunning = function ()
        {
            return promise !== null;
        };

        function increasePlayTime()
        {
            time++;
        }

        function parseTime(time)
        {
            return [
                pad(parseInt(time / 3600, 10), 2),
                pad(parseInt((time % 3600) / 60, 10), 2),
                pad(parseInt((time % 3600 % 60), 10), 2),
            ];
        }
    };
}]);

TimeTrackerModel.factory('Points', ['$interval', function ($interval)
{
    return function ()
    {
        var points = 0,
            scale = 3600,
            self = this,
            promise = null,
            multiplier = 1;

        this.increasePoint = function ()
        {
            points += multiplier;
        };

        this.increasePointBy = function (increment)
        {
            points += increment * scale;
        };

        this.getPoints = function ()
        {
            return parseFloat(points / 3600).toFixed(2);
        };

        this.increaseMultiplier = function ()
        {
            multiplier++;
        };

        this.decreaseMultiplier = function ()
        {
            if (multiplier > 0) {
                multiplier--;
            }
        };

        this.getMultiplier = function ()
        {
            return multiplier;
        };

        this.start = function ()
        {
            promise = $interval(function () {
                self.increasePoint();
            }, 1000);
        };

        this.stop = function ()
        {
            $interval.cancel(promise);
            promise = null;
        };
    };
}]);

TimeTrackerModel.factory('Player', [
    'PlayTime',
    'Points',
    function (PlayTime, Points)
    {
        return function (name) {
            var time = new PlayTime(),
                points = new Points();

            this.getName = function ()
            {
                return name;
            };

            this.getTime = function ()
            {
                return time;
            };

            this.getPoints = function ()
            {
                return points;
            };

            this.clockIn = function ()
            {
                time.start();
                points.start();
            };

            this.clockOut = function ()
            {
                time.stop();
                points.stop();
            };

            this.isClockedIn = function ()
            {
                return time.isRunning();
            };
        };
    }
]);