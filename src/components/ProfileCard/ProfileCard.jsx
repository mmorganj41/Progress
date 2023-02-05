import React from 'react';

import {Card, Image, Icon} from 'semantic-ui-react';

export default function ProfileCard({profileUser}) {
    return (
        <Card>
          <Image src={profileUser?.photoUrl ? profileUser.photUrl : 'https://i.imgur.com/tdi3NGa.png'} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{profileUser?.email}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in {profileUser.createdAt.split('T')[0]}</span>
            </Card.Meta>
            <Card.Description>
              {profileUser?.bio ? profileUser.bio : 'Looks like their biography is empty.'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      )
}