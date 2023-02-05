import React, {useRef, useState, useEffect} from 'react';
import {Segment, Input, Grid, Divider, Button, Icon } from 'semantic-ui-react';

export default function SearchForm({handleCreateSkillFormShow, showCreateSkillForm, search, setSearch}) {

    const searchRef = useRef();

    function handleSearch(e) {
        setSearch(e.target.value);
    }


    return(
        <Segment>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            icon={{color: 'teal', inverted: true, name: 'filter'}}
                            placeholder='Habit'
                            value={search}
                            onChange={handleSearch}
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