// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();

// ----------------------------------------------------------------------------
// routes
router.route( '/home' ).get(( req, res ) => {
    res.render( 'home.jade' );
});

// ----------------------------------------------------------------------------
// exports
module.exports = router;