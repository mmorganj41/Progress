import React from 'react';
import {Segment, Input, Grid, Divider, Button } from 'semantic-ui-react';

export default function SearchForm() {
    return(
        <Segment>
            <Grid columns={2} relaxed='very' stackable>
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
                    />
                </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>
)
}