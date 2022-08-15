import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import Feed from '../../feed/components/Feed'

const ProfileFavorites = () => {
	const { slug } = useParams()
	const apiUrl = `/profiles/${slug}`
	const apiUrlFavorite = `/articles?favorited=${slug}&limit=10&offset=0`
	const [{ response: responseFeed }, doFetch] = useFetch(apiUrl)
	const [{ response: responseFavorite }, doFetchFavorite] = useFetch(apiUrlFavorite)

	useEffect(() => {
		doFetch()
		doFetchFavorite()
	}, [doFetch, doFetchFavorite])

	if (!responseFeed) {
		return null
	}

	if (!responseFavorite) {
		return null
	}

	return (
		<div className='profile-page'>
			<div className='user-info'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-md-10 offset-md-1'>
							<img className='user-img' src={responseFeed.profile.image} alt='profile pic' />
							<h4>{responseFeed.profile.username}</h4>
							<p>{responseFeed.profile.bio}</p>
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
									<Link className='feed-link'
									      to={`/profiles/${responseFeed.profile.username}`}>My
										Posts</Link>
								</li>
								<li className='nav-item'>
									<Link className='feed-link active'
									      to={`/profiles/${responseFeed.profile.username}/favorites`}>Favorites
										Posts</Link>
								</li>
							</ul>
						</div>
						{responseFavorite.articles.length === 0 ?
							<div className='container text-center'>No articles are here... yet.</div> : (
								<Feed articles={responseFavorite.articles} />
							)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileFavorites