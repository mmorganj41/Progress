import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    skill: {type: Schema.Types.ObjectId, ref: 'Skill'},
    subskill: {type: Schema.Types.ObjectId, ref: 'Subskill'},
    startDate: {type: Date, required: true},
    repeatDays: {type: Number, required: true, default: 0},
    completionDates: [{type: Date}],
    order: {type: Number, required: true, default: 0},
    difficulty: {type: String, required: true, default: 'trivial', 
        enum:['trivial', 'easy', 'average', 'challenging', 'difficult']}
})

module.exports = mongoose.model('Habit', habitSchema);