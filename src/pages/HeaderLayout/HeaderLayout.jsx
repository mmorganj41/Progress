import { Grid, Transition} from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import React from 'react';
import "./HeaderLayout.css";


function HeaderLayout({handleLogout}) {
	return ( 
		<Grid className='HeaderLayout' id='mainContent'>
			<Transition animation='slide down' duration={500} transitionOnMount unmountOnHide>
            	<PageHeader handleLogout={handleLogout}/>
			</Transition>
			<Grid.Row>
				<Grid.Column>
					<Outlet />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	 );
}

export default HeaderLayout;