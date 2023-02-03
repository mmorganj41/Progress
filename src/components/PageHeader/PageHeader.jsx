import React, {useContext} from "react";
import { Menu, Dropdown, Header, Sidebar, Image, Icon } from "semantic-ui-react";
import { UserContext } from "../../context/UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./PageHeader.css"

export default function PageHeader({ handleLogout }){
    const loggedUser = useContext(UserContext)

    const navigate = useNavigate();

    
    return (
        <div className="PageHeader">
        <Menu color='teal' inverted fixed="top">
            <Menu.Item onClick={() => navigate('/')}>
                    Progress
            </Menu.Item>
            <Menu.Menu position="right">
                

                <Dropdown item icon='user' text={loggedUser.username}>
                    <Dropdown.Menu>
                        <Dropdown.Item image={{avatar:true, src:(loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png")}} text="Profile" />
                        <Dropdown.Item image={{avatar:true, src:'https://i.imgur.com/yM3EHLc.png'}} text="Logout" onClick={handleLogout}/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu></div>
    )
}