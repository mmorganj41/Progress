import React, {useContext} from "react";
import { Menu, Dropdown, Sidebar, Image, Icon } from "semantic-ui-react";
import { UserContext } from "../../utils/context";
import { Link } from "react-router-dom";
import "./PageHeader.css"

export default function PageHeader({ handleLogout }){
    const loggedUser = useContext(UserContext)

    
    return (
        <Menu color='teal' fixed="top">
            <Menu.Menu position="right">
                <Dropdown item
                    name="profile"
                    image={{ src: "https://react.semantic-ui.com/images/wireframe/square-image.png"}}
                    text={loggedUser?.username}
                >
                    <Dropdown.Menu>
                        <Dropdown.Header>
                            
                        </Dropdown.Header>
                        <Dropdown.Item icon="user" text="Profile" />
                        <Dropdown.Item icon="external" text="Logout" onClick={handleLogout}/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    )
}