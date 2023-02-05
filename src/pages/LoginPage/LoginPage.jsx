import "./LoginPage.css";
import React, { useState } from "react";
import {useImmer} from "use-immer";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../utils/userService';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function LoginPage({handleSignUpOrLogin}){
  const [formState, updateFormState] = useImmer({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    updateFormState(draft => {
      draft[e.target.name] = e.target.value;
    })
  }

  async function handleSubmit() {
    try {
      await userService.login(formState);
      handleSignUpOrLogin();
      navigate('/')
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='https://i.imgur.com/2o8gKIA.png' /> Log In
        </Header>
        <Form autoComplete="off" size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              fluid icon='user'
              iconPosition='left'
              placeholder='username'
              value={formState.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={formState.password}
              onChange={handleChange}
              type='password'
            />
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
        <Message>
          New to progress? <Link to='/signup'>Sign up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}


