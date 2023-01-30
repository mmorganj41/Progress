import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subskillSchema = new Schema({
    name: {type: String, required: true},
    experience: {type: Number, min:0, default: 0, required: true},
    order: {
        type: Number,
        default: 0,
        required: true
    }
})

const skillSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    experience: {type: Number, min:0, default: 0, required: true},
    color: {
        type: String,
        enum: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'],
        default: 'grey'
    },
    photoUrl: String,
    order: {
        type: Number,
        default: 0,
        required: true
    },
    subskill: [{type: subskillSchema}]
})

module.exports = mongoose.model('Skill', skillSchema);