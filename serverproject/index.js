const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}))
const fileRoutes = require('./routes/router');

require('./database')();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes.routes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));