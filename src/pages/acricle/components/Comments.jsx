import React, { useContext, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { Link, useParams } from 'react-router-dom'
import FormComment from './FormComment'
import getDate from '../../../js/getDate'
import { CurrentUserContext } from '../../../context/currentUser'
import CommentDelete from './CommentDelete'

const Comments = () => {
	const { slug } = useParams()
	const apiUrl = `/articles/${slug}/comments`
	const [{ response }, doFetch] = useFetch(apiUrl)

	const [currentUserState] = useContext(CurrentUserContext)

	useEffect(() => {
		doFetch({
			method: 'get',
		})
	}, [doFetch])

	if (!response) {
		return null
	}

	return (
		<div className='row'>
			<div className='col-xs-12 col-md-8 offset-md-2'>
				<div>
					<FormComment slug={slug} />
				</div>
				{response.comments.map((comment, index) => (
					<div className='card' key={index}>
						<div className='card-block'><p className='card-text'>{comment.body}</p></div>
						<div className='card-footer'>
							<Link className='comment-author' to={`/profiles/${comment.author.username}`}>
								<img className='comment-author-img' src={comment.author.image} alt='author pic' />
							</Link>
							<Link className='comment-author'
							      to={`/profiles/${comment.author.username}`}
							      style={{ marginLeft: '10px' }}>{comment.author.username}</Link>
							<span className='date-posted'>{getDate(comment.createdAt)}</span>
							{currentUserState.currentUser && currentUserState.currentUser.username && comment.author.username === currentUserState.currentUser.username && (
								<span className='mod-options'><CommentDelete slug={slug} id={comment.id} /></span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Comments