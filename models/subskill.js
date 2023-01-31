import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subskillSchema = new Schema({
    name: {type: String, required: true},
    experience: {type: Number, min:0, default: 0, required: true},
    order: {
        type: Number,
        default: 0,
        required: true
    },
    habits: [{type: Schema.Types.ObjectId, ref: 'Skill', required: true}],
})

subskillSchema.index({name: 1, skill: 1}, {unique: true})

export default mongoose.model('Subskill', subskillSchema);