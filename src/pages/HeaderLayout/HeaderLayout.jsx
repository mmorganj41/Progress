import { Grid} from 'semantic-ui-react'
import { Outlet } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'


function Layout({loggedUser, handleLogout}) {
	return ( 
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageHeader loggedUser={loggedUser}  handleLogout={handleLogout}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Outlet />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	 );
}

export default Layout;