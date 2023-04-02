import Navbar from './components/navbar/Navbar';
import Homepage from './pages/Homepage';
import Portfolio from './pages/Portfolio';
import Page404 from './pages/Page404';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='*' element={<Page404 />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
