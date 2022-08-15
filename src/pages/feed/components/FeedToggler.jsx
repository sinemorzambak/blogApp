import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../../../context/currentUser'

const FeedToggler = ({ tag }) => {
	const [currentUserState] = useContext(CurrentUserContext)

	return (
		<div className='feed-toggle'>
			<ul className='nav-pills outline-active'>
				{currentUserState.isLoggedIn && (
					<li className='feed-item'>
						<NavLink to='/feed' className='feed-link'>
							<h2>Your feed</h2>
						</NavLink>
					</li>
				)}
				<li className='feed-item'>
					<NavLink to='/' className='feed-link'>
						<h2>Global feed</h2>
					</NavLink>
				</li>
				{tag && (
					<li className='feed-item'>
						<NavLink to={`/tags/${tag}`} className='feed-link'>
							<h2>#{tag}</h2>
						</NavLink>
					</li>
				)}
			</ul>
		</div>
	)
}

export default FeedToggler
