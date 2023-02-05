
export default function RecentHabits({habits}) {
    
    const habitHistory = [];

    for (let key in habits) {
        if (habits[key].length) {
            habitHistory.push(
                <Segment>
                    <DayHeader />
                    <DayList habits={habits[key]}/>
                </Segment>
                );
        }
    }
    
    return (
        <h3>Hi</h3>
    )
}