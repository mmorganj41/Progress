import './FeedSidebar.css'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

export default function FeedSidebar({date, changeDate}) {
    return (
        <div>
            <SemanticDatepicker clearable={false} value={date} onChange={(e, data) => changeDate(e, data)} />
        </div>
    )
}