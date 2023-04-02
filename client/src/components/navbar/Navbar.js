import Nav from 'react-bootstrap/Nav';
import NavigationBar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './navbar.css';

const links = [
	{
		page: 'Homepage',
		link: '/',
	},
	{
		page: 'Portfolio',
		link: '/portfolio',
	},
];

function Navbar() {
	return (
		<NavigationBar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Link className='navbar-brand' to={'/'} style={{ marginLeft: '12px' }}>
				Portfolio Management
			</Link>
			<NavigationBar.Toggle aria-controls='responsive-navbar-nav' />
			<NavigationBar.Collapse id='responsive-navbar-nav'>
				<Nav className='me-auto' />
				<Nav style={{ marginRight: '12px' }}>
					{links.map((element, index) => (
						<Link key={index} className='nav-link pageLink' to={element.link}>
							{element.page}
						</Link>
					))}
				</Nav>
			</NavigationBar.Collapse>
		</NavigationBar>
	);
}

export default Navbar;
