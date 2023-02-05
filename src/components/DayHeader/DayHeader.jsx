import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { readableDateString } from '../../utils/date';

export default function DayHeader({day, handleClick}) {
    const stylizedDay = readableDateString(new Date(day.replace(/-/g, '\/')));

    return (
        <Card.Content textAlign='left' onClick={handleClick}>
            <Header color='teal'>{stylizedDay}</Header>
        </Card.Content>
    )
}