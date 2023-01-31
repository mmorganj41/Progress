import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    repeatDays: {type: Number, required: true, default: 0},
    completionDates: [{type: Date}],
    difficulty: {type: String, required: true, default: 'trivial', 
        enum:['trivial', 'easy', 'average', 'challenging', 'difficult']}
})

export default mongoose.model('Habit', habitSchema);