import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default function HabitCard({habit, color}) {
    return (
        <Card fluid color={color}>
            <Card.Content>
                <Card.Header>
                    <Icon name='circle outline' size='large'/>
                    {habit?.name}
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                {habit?.description}
            </Card.Content>
        </Card>
    )
}