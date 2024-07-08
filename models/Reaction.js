const { Schema } = require('mongoose');

// Define Reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

// Format date
reactionSchema
    .path('createdAt')
    .get(function(date) {
        return date.toISOString();
    });

module.exports = reactionSchema;
