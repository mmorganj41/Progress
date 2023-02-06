import React from 'react';
import { Segment, Dimmer, Loader, Image, Message } from 'semantic-ui-react';

export default function BasicLoader() {
    return (<Segment>
      <Dimmer active inverted>
        <Loader size='mini'>Loading</Loader>
      </Dimmer>

      <Message></Message> 
    </Segment>);
}
