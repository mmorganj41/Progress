import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { readableDateString } from '../../utils/date';

export default function DayHeader({day}) {
    const stylizedDay = readableDateString(new Date(day.replace(/-/g, '\/')));

    return (
        <Card.Content textAlign='left'>
            <Header color='teal'>{stylizedDay}</Header>
        </Card.Content>
    )
}