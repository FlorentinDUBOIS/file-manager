# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# router
router
    .route '/menu'
    .get ( req, res ) ->
        routes = [
            { icon: 'folder', name: 'navigation.fs', link: '#/fs' }
        ]

        if req.user.administrator is true
            administrator = [
                { icon: 'account_circle', name: 'navigation.manageAccount', link: '#/manage-account' }
            ]

            for i, route of administrator
                routes.push route

        res.json routes

# -----------------------------------------------------------------------------
# exports
module.exports = router