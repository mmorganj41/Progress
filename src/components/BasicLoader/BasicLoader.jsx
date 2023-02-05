import React from 'react';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

export default function BasicLoader() {
    return (<Segment>
      <Dimmer active inverted>
        <Loader size='mini'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>);
}
