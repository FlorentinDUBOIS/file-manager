# -----------------------------------------------------------------------------
# bytes filter
kraken.filter 'bytes', [->
    ( input, precision ) ->
        precision = 1 unless precision?

        if input
            units     = ['o', 'Ko', 'Mo', 'Go', 'To', 'Po']
            number    = Math.floor Math.log( input ) / Math.log( 1024 )

            input = "#{ ( input / Math.pow 1024, Math.floor number ).toFixed precision } #{ units[number] }"

        input
]