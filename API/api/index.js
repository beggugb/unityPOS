import http from 'http'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import routes from './server/routes'
import helmet from 'helmet'
import cors from 'cors';
import model from './server/src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
import fs from 'fs'
import shell from 'shelljs'
const hostname = 'localhost'
const port = 4000
const app = express();
const server = http.createServer(app)
const multer  = require('multer')

app.use('/api/v1/static', express.static(__dirname + '/public'));
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));


server.listen(port, hostname, () =>{
	console.log(`Server is runing ar http://${hostname}:${port}/`)
})
