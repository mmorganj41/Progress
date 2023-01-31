import { Grid} from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import React from 'react';
import "./HeaderLayout.css";


function HeaderLayout({handleLogout}) {
	return ( 
		<Grid className='HeaderLayout' id='mainContent'>
            <PageHeader handleLogout={handleLogout}/>
			<Grid.Row>
				<Grid.Column>
					<Outlet />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	 );
}

export default HeaderLayout;