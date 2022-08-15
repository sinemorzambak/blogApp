import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import UserArticle from './components/UserArticle'

const Profile = () => {
	const { slug } = useParams()
	const apiUrl = `/profiles/${slug}`
	const [{ response }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch])

	if (!response) {
		return null
	}

	return (
		<div className='profile-page'>
			<div className='user-info'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-md-10 offset-md-1'>
							<img className='user-img' src={response.profile.image} alt='profile pic' />
							<h4>{response.profile.username}</h4>
							<p>{response.profile.bio}</p>
							<Link className='btn btn-sm btn-outline-secondary action-btn' to='/settings'><i
								className='ion-gear-a' /> Edit Profile Settings </Link>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-xs-12 col-md-10 offset-md-1'>
						<div className='articles-toggler'>
							<ul className='nav nav-pills outline-active'>
								<li className='nav-item'>
									<Link className='feed-link active'
									      to={`/profiles/${response.profile.username}`}>Posts</Link>
								</li>
								<li className='nav-item'>
									<Link className='feed-link'
									      to={`/profiles/${response.profile.username}/favorites`}>Favorites
										Posts</Link>
								</li>
							</ul>
						</div>
						{response ? <UserArticle /> :
							<div className='container text-center'>No articles are here... yet.</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile