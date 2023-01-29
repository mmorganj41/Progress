import { Grid} from 'semantic-ui-react'
import { Outlet } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'


function HeaderLayout({handleLogout}) {
	return ( 
		<Grid>
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