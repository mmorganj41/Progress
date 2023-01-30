import React, {useState} from 'react';
import {Segment, Input, Grid, Divider, Button } from 'semantic-ui-react';
import CreateSkillForm from '../CreateSkillForm/CreateSkillForm';

export default function SearchForm() {
    const [showForm, setShowForm] = useState(false);
    
    function handleFormShow(e) {
        e.preventDefault();
        setShowForm(!showForm);
    }

    return(
        <Segment>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            action={{ color: 'teal', content: 'Search' }}
                            icon='search'
                            iconPosition='left'
                            placeholder='Habit'
                        />
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Button
                            color='teal'
                            content='Create New Skill'
                            icon='add'
                            labelPosition='left'
                            onClick={handleFormShow}
                        />
                    </Grid.Column>
                </Grid.Row>
                

            
            {showForm &&
                (<Grid.Row columns={1}>
                    <Grid.Column>
                        <CreateSkillForm />
                    </Grid.Column>
                </Grid.Row>)}
            </Grid>
        </Segment>
)
}