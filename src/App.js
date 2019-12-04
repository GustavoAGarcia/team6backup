import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import BillPage from './pages/BillPage/BillPage'
import RepresentativePage from './pages/Representative/RepresentativePage'
import KYRLogoComponent from './components/KYRLogo/KYRLogoComponent'
import NavigationBarComponent from './components/NavigationBar/NavigationBarComponent';
import RepresentativeCard from './components/RepresentativeCard/RepresentativeCard';

function App() {
	return (
		<div>
			<BrowserRouter>
    
				<KYRLogoComponent/>
				<NavigationBarComponent/>
    
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/bill" component={BillPage} />
					<Route path="/representative" component={RepresentativePage}/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
