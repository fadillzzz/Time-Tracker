var connect = require('connect'),
    app = require('./config.json');

connect.createServer(connect.static(app.path.main)).listen(app.port);