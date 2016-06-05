# -----------------------------------------------------------------------------
# requirements
mongoose = require 'server/models/db/database'

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'signet', new mongoose.Schema
    user: mongoose.Schema.Types.ObjectId
    path: mongoose.Schema.Types.String