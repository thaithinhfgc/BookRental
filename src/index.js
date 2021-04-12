const express = require('express');
const app = express();
require('express-async-errors');
const winston = require('winston');

require('./app/logging');
require('./app/database');
require('./app/config');
require('./app/routers')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening on port ${port}`);
});
