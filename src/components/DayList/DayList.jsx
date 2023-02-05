import React from 'react';
import { Header, List, Card} from 'semantic-ui-react';

export default function DayList({habits}) {

    function difficultyColoring(difficulty) {
        let color;
        switch (difficulty) {
            case 'trivial':
                color = 'teal'
                break;
            case 'easy':
                color= 'green'
                break;
            case 'average':
                color= 'yellow'
                break;
            case 'challenging':
                color= 'orange'
                break;     
            case 'difficult':
                color= 'red'
                break;  
            default:
                color= 'black'
        }
        return color;
        
    }

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