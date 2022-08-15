import React, { Fragment, useContext, useState } from 'react'
import Menu from './Menu'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../../context/currentUser'


const Header = () => {
	const [activeButton, setActiveButton] = useState(false)
	const [currentUserState] = useContext(CurrentUserContext)

	return (
		<nav className='bg-light'>
			<Menu active={activeButton} setActive={setActiveButton} currentUserState={currentUserState} />
			<nav className='navbar navbar-expand-lg navbar-light bg-light container'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand navbar-header' to='/' onClick={() => setActiveButton(false)}>
						Home
					</NavLink>
					<div className='hamburger-lines' onClick={() => setActiveButton(!activeButton)}>
						<span className={activeButton ? 'line line1 rotated' : 'line line1'} />
						<span className={activeButton ? 'line line2 rotated' : 'line line2'} />
						<span className={activeButton ? 'line line3 rotated' : 'line line3'} />
					</div>
					<div className='collapse navbar-collapse'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/'>
									
									<div className='text-headr'>
									<h3>
										CONDUIT
									</h3>

									</div>
									
								</NavLink>
							</li>
							{currentUserState.isLoggedIn === false && (
								<Fragment>
									<li className='nav-item'>
										<NavLink className='nav-link nav-link-item' to='/login'>
											Sign In
										</NavLink>
									</li>
									<li className='nav-item'>
										<NavLink className='nav-link nav-link-item' to='/register'>
											Sign Up
										</NavLink>
									</li>
								</Fragment>
							)}
						</ul>
						<ul className='navbar-nav'>
							{currentUserState.isLoggedIn && (
								<Fragment>
									<li className='nav-item'>
										<NavLink to='/' className='nav-link nav-link-item'>
											Home
											<span className='material-icons  nav-link'>home</span>
										</NavLink>
									</li>
									<li className='nav-item'>
										<NavLink to='/articles/new' className='nav-link nav-link-item'>
											New Post
											<span className='material-icons  nav-link'>post_add</span>
										</NavLink>
									</li>
									<li className='nav-item'>
										<NavLink to='/settings' className='nav-link nav-link-item'>
											Settings
											<span className='material-icons  nav-link'>settings</span>
										</NavLink>
									</li>
									<li className='nav-item'>
										<NavLink
										    
											to={`/profiles/${currentUserState.currentUser.username}`}
											className='nav-link nav-link-item'>
											{currentUserState.currentUser.username}
											
											
										</NavLink>
									</li>
								</Fragment>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</nav>
	)
}

export default Header
