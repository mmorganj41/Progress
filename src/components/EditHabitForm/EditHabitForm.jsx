import React, {useState} from 'react';

export default function EditHabitForm({habit}) {
    const [formState, setFormState] = useState(habit);



    return (
        <>
            <Card.Content onClick={toggleShowDetails}>
                <Card.Header className='HabitCard Header'>
                    <Icon name={icon} size='large' onClick={handleClick}/>
                    {habit?.name}
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <Header textAlign='right' as='h4' style={{textTransform: 'capitalize'}}>{habit?.difficulty}</Header>
                {habit?.description}
            </Card.Content>
            <Card.Content extra>
                <div className='HabitCard Details'>
                    <div>
                        <Icon name="calendar" /><strong>Start Date: </strong>{habit?.startDate}
                    </div>
                    <div>
                        <strong>End Date: </strong><Input value={formState.endDate}/>
                    </div>
                    <div>
                        <strong>Repeats: </strong><Input value={formState.repeatDays}/> 
                    </div>       
                </div>
            </Card.Content>
        </>
    )
}