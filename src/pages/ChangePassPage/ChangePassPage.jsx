import "./ChangePassPage.css";
import React, { useState, useContext } from "react";
import {useImmer} from "use-immer";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../utils/userService';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { UserContext } from "../../context/UserContext/UserContext";

export default function ChangePassPage(){
  const [formState, updateFormState] = useImmer({
    password: '',
    newPassword: '',
    passwordConf: '',
  })
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  const navigate = useNavigate();

  function handleChange(e) {
    updateFormState(draft => {
      draft[e.target.name] = e.target.value;
    })
  }

  async function handleSubmit() {
    try {
      if (formState.newPassword !== formState.passwordConf) throw new Error("Password do not match")
      await userService.changePassword(formState);
      navigate(`/user/${user.username}`);
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Change Password:
        </Header>
        <Form autoComplete="off" size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="password"
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Current Password'
              value={formState.password}
              onChange={handleChange}
              type='password'
            />
            <Form.Input
              name="newPassword"
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='New Password'
              value={formState.newPassword}
              onChange={handleChange}
              type='password'
            />
            <Form.Input
              name="passwordConf"
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm New Password'
              value={formState.passwordConf}
              onChange={handleChange}
              type='password'
            />
            <Button color='teal' fluid size='large'>
              Change Password
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  )
}
