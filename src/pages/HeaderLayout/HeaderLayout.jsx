import { Grid} from 'semantic-ui-react'
import { Outlet } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'


function HeaderLayout({handleLogout}) {
	return ( 
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageHeader handleLogout={handleLogout}/>
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

export default HeaderLayout;