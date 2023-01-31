import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default function HabitCard({color}) {
    return (
        <Card fluid color={color}>
            <Card.Content>
                <Card.Header>
                    <Icon name='circle outline' size='large'/>
                    Habit Name
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                Description
            </Card.Content>
        </Card>
    )
}