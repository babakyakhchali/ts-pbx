import "reflect-metadata";

import { useExpressServer } from "routing-controllers";
let express = require("express");

let app = express();
useExpressServer(app, {
    controllers: [__dirname +"/src/controllers/*.js"]
});

app.set('view engine', 'pug');
app.set('views', 'src/templates');


app.listen(3000);