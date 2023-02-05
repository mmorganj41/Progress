import React, {useContext} from "react";
import { Menu, Dropdown, Header, Sidebar, Button, Image, Icon, Transition } from "semantic-ui-react";
import { UserContext } from "../../context/UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./PageHeader.css"
import SearchBar from "../SearchBar/SearchBar";

export default function PageHeader({ handleLogout }){
    const loggedUser = useContext(UserContext)

    const navigate = useNavigate();

    
    return (
        <div className="PageHeader">
        <Menu color='teal' inverted fixed="top">
            <Menu.Item onClick={() => navigate('/')}>
                    <Button compact animated='fade' fluid color={"teal"}>
                        <Button.Content hidden>
                            Progress
                        </Button.Content>
                        <Button.Content visible>
                            <Image rounded size="mini" src="https://i.imgur.com/2o8gKIA.png"/>
                        </Button.Content>
                        
                    </Button>
            </Menu.Item>
            <Menu.Menu position="right">
                
                <SearchBar />
                <Dropdown item icon='user' text={loggedUser.username}>
                    
                    <Dropdown.Menu>
                        <Dropdown.Item image={{avatar:true, src:(loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png")}} text="Profile" onClick={() => navigate(`/user/${loggedUser.username}`)}/>
                        <Dropdown.Item 
                            image={{avatar: true, src:'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/change-password-icon.png'}} 
                            onClick={() => navigate(`/changePassword`)} 
                            text='Password'
                        />
                        <Dropdown.Item image={{avatar:true, src:'https://i.imgur.com/yM3EHLc.png'}} text="Logout" onClick={handleLogout}/>
                    </Dropdown.Menu>
                    
                </Dropdown>
            </Menu.Menu>
        </Menu></div>
    )
}