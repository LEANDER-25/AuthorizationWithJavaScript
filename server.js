var express = require('express');
var cors = require('cors');
var app = express();

var authRoute = require("./routers/auth-routers");

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/api/gateway', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT = ${PORT}`);
})
