import React from 'react';
import { Message } from 'semantic-ui-react';

export default function ErrorMessage(props){
    return (
    <Message negative>
      <Message.Header>{props.error}</Message.Header>
    </Message>
    );
}