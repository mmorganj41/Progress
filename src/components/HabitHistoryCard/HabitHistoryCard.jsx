              
import React, { useState } from 'react';
import DayHeader from '../DayHeader/DayHeader';
import DayList from '../DayList/DayList';
import { Card, Segment } from 'semantic-ui-react';

export default function HabitHistoryCard({day, habits}) {
    const [showHabits, setShowHabits] = useState(true);

    function handleClick(e) {
        setShowHabits(!showHabits);
    }

    return(
              <Card fluid>
                    <DayHeader day={day} handleClick={handleClick}/>
                    {showHabits && <DayList habits={habits}/>}
                </Card>);
}