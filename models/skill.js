import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    name: {type: String, required: true},
    experience: {type: Number, min:0, default: 0},
    color: {
        type: String,
        enum: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'],
        default: 'grey'
    },
    photoUrl: String,
    order: {
        type: Number,
        default: 0,
    },
    subskills: [{type: Schema.Types.ObjectId, ref: 'Subskill'}],
    habits: [{type: Schema.Types.ObjectId, ref: 'Habit'}]
})

skillSchema.index({name: 1, user: 1}, {unique: true})

export default mongoose.model('Skill', skillSchema);