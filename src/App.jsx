import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/header/Header'
import MyRoutes from './components/routes'
import { CurrentUserChecker, CurrentUserProvider } from './context/currentUser'
import '../src/assets/style.css'

const App = () => {
	return (
		<CurrentUserProvider>
			<CurrentUserChecker>
				<Router>
					<Header />
					<main>
						<MyRoutes />
					</main>
				</Router>
			</CurrentUserChecker>
		</CurrentUserProvider>
	)
}

export default App
