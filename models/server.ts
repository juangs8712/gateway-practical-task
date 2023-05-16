import { Server as HttpServer, createServer } from 'http';

import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';

import { 
    gatewayRouter,
    peripheralRouter
}from '../routes/index.js';

import { dbConnection } from '../database/config.js';

mongoose.set('strictQuery', true);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default class Server{
    private app  : Application;
    private port : string;
    private server: HttpServer;

    private path = {
        gateway:    '/api/gateway',
        peripheral: '/api/peripheral',
    }
    // -----------------------------------------------------
    constructor(){
        this.app = express();
        this.port = process.env.PORT ?? '8080';
        this.server = createServer( this.app );
 
        // connect to the database
        this.conectarDB();

        // middlewares
        this.middlewares();

        // app routes
        this.routes();
    }

    // -----------------------------------------------------
    async conectarDB(){
        await dbConnection();
    }
    // -----------------------------------------------------
    middlewares(){
        // CORS
        this.app.use( cors() );

        // parse and read de body
        this.app.use( express.json() );   

        // public path
        this.app.use( express.static( 'public' ) );
    }
    // -----------------------------------------------------
    routes(){
        this.app.use( this.path.gateway,    gatewayRouter );
        this.app.use( this.path.peripheral, peripheralRouter );
    }
    // -----------------------------------------------------
    listen(){
        this.server.listen( this.port, () =>{
            console.log( 'Server running on port: ', this.port );
        })
    }
    // -----------------------------------------------------
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~