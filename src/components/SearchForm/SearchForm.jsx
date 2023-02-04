import React, {useState} from 'react';
import {Segment, Input, Grid, Divider, Button } from 'semantic-ui-react';

export default function SearchForm({handleCreateSkillFormShow, showCreateSkillForm, search, setSearch}) {

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
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
                            value={search}
                            onChange={handleSearch}
                            onClick={handleSubmit}
                        />
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Button
                            color='teal'
                            content={showCreateSkillForm ? 'Remove New Skill' : 'Create New Skill'}
                            icon={showCreateSkillForm ? 'stop' : 'add'}
                            labelPosition='left'
                            onClick={handleCreateSkillFormShow}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
)
}