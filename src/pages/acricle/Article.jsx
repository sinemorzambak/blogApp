import React, { Fragment, useContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TagList from '../feed/components/TagList'
import { CurrentUserContext } from '../../context/currentUser'
import AddToFavorite from '../feed/components/AddToFavorite'
import Comments from './components/Comments'
import getDate from '../../js/getDate'

const Article = () => {
	const [currentUserState] = useContext(CurrentUserContext)

	const { slug } = useParams()
	const apiUrl = `/articles/${slug}`
	const navigate = useNavigate()

	const [isDeleted, setIsDeleted] = useState(false)
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
	const [, doArticleDelete] = useFetch(apiUrl)

	const [isFollowing, setIsFollowing] = useState(true)
	const apiFollow = response && `/profiles/${response.article.author.username}/follow`
	const [{ response: responseFollow }, doFollow] = useFetch(apiFollow)
	const isFollow = responseFollow && responseFollow.profile.following ? 'Follow' : 'Unfollow'

	const handleFollow = () => {
		setIsFollowing(true)
		doFollow({
			method: isFollowing ? 'post' : 'delete',
		})
		setIsFollowing(false)
	}
	const isAuthor = () => {
		if (!response || !currentUserState.isLoggedIn) {
			return false
		}
		return response.article.author.username === currentUserState.currentUser.username
	}
	const deleteArticle = () => {
		doArticleDelete({
			method: 'delete',
		})
		setIsDeleted(true)
	}

	useEffect(() => {
		if (isDeleted) {
			navigate('/')
		}
	})
	useEffect(() => {
		doFetch()
	}, [doFetch])

	if (!response) {
		return null
	}

	const editOrFollow = isAuthor() ? (
		<span>
									<Link
										to={`/articles/${response.article.slug}/edit`}
										className='btn btn-outline-secondary btn-sm'>
										<i className='ion-edit' /> Edit Article
									</Link>
									<button className='btn btn-sm btn-outline-danger' onClick={deleteArticle}
									        style={{ marginLeft: '10px' }}>
									<i className='ion-trash-a' /> Delete Article </button>
								</span>) : (<span>
									<button
										onClick={handleFollow}
										className='btn btn-sm action-btn btn-secondary' style={{ marginRight: '10px' }}>
										<i className='ion-plus-round' />{isFollow} {response.article.author.username}
									</button>
									<AddToFavorite className='btn btn-sm btn-outline-primary'
									               isFavorited={response.article.favorited}
									               favoritesCount={response.article.favoritesCount}
									               articleSlug={response.article.slug} body={' Favorite Article'} />
								</span>)

	return (
		<div className='article-page'>
			<div className='banner'>
				{!isLoading && response && (
					<div className='container'>
						<h1>{response.article.title}</h1>
						<div className='article-meta'>
							<Link to={`/profiles/${response.article.author.username}`}>
								<img src={response.article.author.image} alt='profile pic' />
							</Link>
							<div className='info'>
								<Link to={`/profiles/${response.article.author.username}`}>
									{response.article.author.username}
								</Link>
								<span className='date'>{getDate(response.article.createdAt)}</span>
							</div>
							{editOrFollow}
						</div>
					</div>
				)}
			</div>
			<div className='container page'>
				{isLoading && <div>Loading...</div>}
				{error && <div>Some error happened</div>}
				{!isLoading && response && (
					<Fragment>
						<div className='row article-content'>
							<div className='col-xs-12'>
								<div>
								    <p>{response.article.description}</p>
									<h2>{response.article.body}</h2>
									
								</div>
								<TagList article={response.article} />
							</div>
						</div>
						<hr />
						<div className='article-actions'>
							<div className='article-meta'>
								<Link to={`/profiles/${response.article.author.username}`}>
									<img src={response.article.author.image} alt='' />
								</Link>
								<div className='info'>
									<Link className='author'
									      to={`/profiles/${response.article.author.username}`}>{response.article.author.username}</Link>
									<span className='date'>{getDate(response.article.createdAt)}</span>
								</div>
								{editOrFollow}
							</div>
						</div>
						<Comments />
					</Fragment>
				)}
			</div>
		</div>
	)
}

export default Article
