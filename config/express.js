import express from "express";
import cors from 'cors';
import compression from "compression";
import methodOverride from 'method-override';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOverride());

require('../src/route/route.js')(app);

module.exports = app;