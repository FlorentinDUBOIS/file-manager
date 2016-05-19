// ----------------------------------------------------------------------------
// requirements
const express     = require( 'express' );
const bparser     = require( 'body-parser' );
const helmet      = require( 'helmet' );
const compression = require( 'compression' );
const morgan      = require( 'morgan' );
const path        = require( 'path' );
const walk        = require( 'walk' );
const pug         = require( 'pug' );
const session     = require( 'express-session' );
const uuid        = require( 'uuid' );
const Logger      = require( './server/models/logger' );
const sha512      = require( 'sha512' );
const logger      = new Logger( 'Server' );
const User        = require( './server/models/db' ).models.User;

// ----------------------------------------------------------------------------
// bind uncaught exception
process.on( 'uncaughtException', ( e ) => {
    if( e instanceof Array ) {
        for( var i in e ) {
            logger.error( e[i].message );
        }
    } else {
        logger.error( e.message );
    }
});

// ----------------------------------------------------------------------------
// create server
logger.info( 'Create server' );

const server  = express();

// ----------------------------------------------------------------------------
// settings
server.set( 'views', 'client/views' );
server.set( 'view engine', 'jade' );

server.engine( 'jade', pug.__express );

// ----------------------------------------------------------------------------
// load modules
logger.info( 'Load modules' );

if( server.get( 'env' ) != 'production' ) {
    server.use( morgan( 'dev', {
        skip: ( req, res ) => res.statusCode < 400
    }));
} else {
    server.user( morgan( 'common' ));
}

server.use( helmet());
server.use( compression());
server.use( bparser.urlencoded({ extended: true }));
server.use( bparser.json());
server.use( session({
    genid: uuid.v4,
    secret: uuid.v4(),
    resave: false,
    saveUninitialized: true,
}));

// ----------------------------------------------------------------------------
// load static routes
let routes = require( './server/static' );

for( let route of routes ) {
    logger.info( `bind route ${ route.real } to ${ route.syml }` );

    server.use( route.syml, express.static( path.join( __dirname, route.real )));
}

// ----------------------------------------------------------------------------
// walk controllers
let walker = walk.walk( path.join( __dirname, 'server', 'controllers' ));

walker.on( 'file', ( root, fileStats, next ) => {
    logger.info( `Load file : ${ path.join( root, fileStats.name ).replace( __dirname, '' ) }` )

    server.use( require( path.join( root, fileStats.name )));

    next();
});

// ----------------------------------------------------------------------------
// launch server
server.listen( process.env.PORT || 80, () => {
    logger.info( `Server launch at port ${ process.env.PORT || 80 }` );
});

// ----------------------------------------------------------------------------
// no user
User.count(( error, count ) => {
    if( error ) {
        return logger.error( error );
    }

    if( !count ) {
        let salt = uuid.v4();
        let defaut = new User({
            username: 'user',
            password: sha512( `${ salt }:password` ).toString( 'hex' ),
            salt: salt,
            email: 'server@florentin-dubois.fr'
        });

        defaut.save(( error ) => {
           if( error ) {
               return logger.error( error );
           }

           logger.info( 'Default user created' );
        });
    }
});