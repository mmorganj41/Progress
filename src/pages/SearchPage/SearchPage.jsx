import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Container } from 'semantic-ui-react';
import SearchResults from '../../components/SearchResults/SearchResults';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let query = useQuery();
    return (
        <>
        <Header as='h1'>Search: <span style={{color: 'teal'}}>{query}</span></Header>
        <Container style={{maxWidth: '1000px'}}>
            <SearchResults />
        </Container>
        </>
    )
}