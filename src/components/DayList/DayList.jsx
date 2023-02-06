import React from 'react';
import { Header, List, Card} from 'semantic-ui-react';

export default function DayList({habits}) {

    function difficultyColoring(difficulty) {
        let color;
        switch (difficulty) {
            case 'trivial':
                color = '#A7A7A7'
                break;
            case 'easy':
                color= '#999999'
                break;
            case 'average':
                color= '#808080'
                break;
            case 'challenging':
                color= '#686868'
                break;     
            case 'difficult':
                color= 'black'
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