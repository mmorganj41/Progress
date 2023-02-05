import React, {useState} from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search?=${search}`)
    }

    return (
    
        <Menu.Item>
            <form onSubmit={handleSubmit}>
                <Input className='icon' action={{content: 'Search', onClick: (e) => handleSubmit(e)}} value={search} onChange={handleChange} icon='search' iconPosition='left' placeholder='Search...' />
            </form>
        </Menu.Item>
        
    );
}
