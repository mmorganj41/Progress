import './FeedSidebar.css'
import { Calendar } from 'react-calendar-mg';

export default function FeedSidebar({date, setDate}) {
    return (
        <div>
            <Calendar value={date} onChangeDate={setDate} />
        </div>
    )
}