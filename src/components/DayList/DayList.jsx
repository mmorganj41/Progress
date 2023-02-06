import React from 'react';
import { Header, List, Card} from 'semantic-ui-react';
import {difficultyColoring} from '../../utils/leveling';

export default function DayList({habits}) {

    const habitList = habits.map(habit => {
        const color = difficultyColoring(habit.difficulty);

        return (<List.Item key={habit._id} >
            <List.Content >
                <List.Header>
                <span style={{color: color}}>{habit?.name}</span>
                </List.Header>
                <List.Description>
                {habit?.description}
                </List.Description>
            </List.Content>
        </List.Item>)
    })

    return (
        <Card.Content textAlign='left'>
            <List divided relaxed>
            {habitList}
            </List>
        </Card.Content>
    )
}