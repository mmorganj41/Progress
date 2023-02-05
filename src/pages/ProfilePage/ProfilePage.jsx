import React, {useState} from 'react';

import userService from '../../utils/userService';

import { useParams } from 'react-router-dom';

export default function ProfilePage() {
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { username } = useParams();

    async function getProfile() {
        try {
            const response = await userService.getProfile(username);
            setLoading(false);

        }
    }

    return (<h1>ProfilePage</h1>)
}