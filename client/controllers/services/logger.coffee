kraken.service '$logger', ['$mdToast', ( $mdToast ) ->
    @info = ( message ) ->
        toast = $mdToast.simple()
        toast
            .textContent message
            .position 'top right'

        $mdToast.show toast

    @warn = ( message ) ->
        toast = $mdToast.simple()
        toast
            .textContent message
            .position 'top right'

        $mdToast.show toast

    @error = ( message ) ->
        toast = $mdToast.simple()
        toast
            .textContent message
            .position 'top right'

        $mdToast.show toast

    return
]