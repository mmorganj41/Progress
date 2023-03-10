import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const habitSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    startDate: {type: Date, required: true, default: dateToday()},
    endDate: {type: Date, default: null},
    repeatDays: {type: Number, required: true, default: 0},
    completionDates: {type: Map, of: Boolean, default: new Map()},
    difficulty: {type: String, required: true, default: 'trivial', 
        enum:['trivial', 'easy', 'average', 'challenging', 'difficult']},
    username: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

function dateToday() {
        const date = new Date();
        return date.toISOString().split('T')[0];
}

export default mongoose.model('Habit', habitSchema);