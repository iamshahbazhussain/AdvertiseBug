const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let daySchema = new Schema({
    posts: {
        type: [Object],
        required: true,
    },
    date: { type: String, required: true },
    topHome: { type: Number, required: true },
    topSub: { type: Number, required: true },
    topSubsub: { type: Number, required: true },
    created_at: Date,

}, { timestamps: true });

daySchema.index({ createdAt: 1 }, { expires: "2m" })

module.exports = mongoose.model('Day', daySchema);
