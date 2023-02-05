import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Container } from 'semantic-ui-react';
import SearchResults from '../../components/SearchResults/SearchResults';
import userService from '../../utils/userService';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    let query = useQuery();

    async function makeSearch() {
        try {
            const response = await userService.search(query);
            setUsers(response);
            setLoading(false);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        makeSearch();
        console.log(users);
    }, [query]);

    
    return (
        <>
        <Header as='h1'>Search: <span style={{color: 'teal'}}>{query.get('username')}</span></Header>
        <Container style={{maxWidth: '1000px'}}>
            <SearchResults />
        </Container>
        </>
    )
}