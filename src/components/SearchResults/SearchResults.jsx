import React from 'react';
import { Segment } from 'semantic-ui-react';
import SearchItem from '../SearchItem/SearchItem';
import BasicLoader from '../BasicLoader/BasicLoader';

export default function SearchResults({users, loading}) {
    const usersSearched = users?.map(user => {
        return <SearchItem user={user}/>
    });

    console.log(usersSearched);

    return (<Segment>
        {loading ? <BasicLoader /> : usersSearched}
    </Segment>)
}