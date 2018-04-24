import "reflect-metadata";

import { useExpressServer } from "routing-controllers";

import { UserController } from "./src/controllers/UserController";
import { FsDomainController } from './src/controllers/FsDomainController';
import { XmlCurlController } from "./src/controllers/XmlCurlController";

let express = require("express");

let app = express();
useExpressServer(app, {
    controllers: [UserController, FsDomainController, XmlCurlController]
});

app.set('view engine', 'pug');
app.set('views', 'src/templates');


app.listen(3000);