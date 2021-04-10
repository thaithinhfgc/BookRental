const express = require('express');
const app = express();
const config = require('config')

require('./app/database');
require('./app/config');
require('./app/routers')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
