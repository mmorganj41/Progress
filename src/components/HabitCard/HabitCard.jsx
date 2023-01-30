import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default function HabitCard() {
    return (
        <Card fluid color='teal'>
            <Card.Content>
                <Card.Header>
                    <Icon name='circle' size='large'/>
                    Habit Name
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                Description
            </Card.Content>
        </Card>
    )
}