import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';

export default function EditProfile({user, setShowEdit}) {
    const [description, setDescription] = useState(user.bio);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    function handleChange(e) {
        setDescription(e.target.value);
    }

     function handleFileInput(e) {
        setFile(e.target.files[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", file);

        formData.append('bio', description);
        try {
            userService.editProfile(formData);
            setShowEdit(false);
        } catch(err) {
            setError('Error. Could not edit Profile.');
        }
    }

    return (
            <Card.Description>
                <Input
                    type='file'
                    name='photo'
                    placeholder='upload image'
                    onChange={handleFileInput}
                    size='small'
                />
                <TextArea
                    name='description'
                    value={description}
                    placeholder='Description'
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit}>Submit</Button>
                {error && <ErrorMessage error={error} />}
            </Card.Description>
    )
}