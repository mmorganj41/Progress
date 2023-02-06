import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import SearchItem from '../SearchItem/SearchItem';
import BasicLoader from '../BasicLoader/BasicLoader';

export default function SearchResults({users, loading}) {
    const usersSearched = users?.length ? users.map(user => {
        return <SearchItem user={user}/>
    }) : (<Header>No Results.</Header>);

    console.log(usersSearched);

    return (<Segment>
        {loading ? <BasicLoader /> : usersSearched}
    </Segment>)
}