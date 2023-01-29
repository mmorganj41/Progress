import React, {useContext} from "react";
import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { UserContext } from "../../utils/context";

export default function PageHeader({ handleLogout }){
    const loggedUser = useContext(UserContext)
    return (
        <Segment clearing>
        <Header as="h2" floated="right">
          <Link to="/">
            <Icon name="home"></Icon>
          </Link>
          <Link to="" onClick={handleLogout}>
            Logout
          </Link>
        </Header>
        <Header as="h2" floated="left">
          <Link to={`/${loggedUser?.username}`}>
            <Image
              src={
                loggedUser?.photoUrl
                  ? loggedUser?.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
              avatar
            ></Image>
          </Link>
        </Header>
      </Segment>
    )
}