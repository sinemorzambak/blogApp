import React from 'react'
import { Link } from 'react-router-dom'
import TagList from './TagList'
import AddToFavorite from './AddToFavorite'
import getDate from '../../../js/getDate'

const Feed = ({ articles }) => {
	return (
		<div>
			{articles.map((article, index) => (
				<div className='article-preview' key={index}>
					<div className='article-meta'>
						<Link to={`/profiles/${article.author.username}`}>
							<img src={article.author.image} alt='' />
						</Link>
						<div className='info'>
							<Link to={`/profiles/${article.author.username}`} className='author'>
								{article.author.username}
							</Link>
							<span className='date'>{getDate(article.createdAt)}</span>
						</div>
						<div className='pull-xs-right'>
							<AddToFavorite isFavorited={article.favorited} favoritesCount={article.favoritesCount}
							               articleSlug={article.slug} />
						</div>
					</div>
					<Link to={`/articles/${article.slug}`}>
						<h1>{article.title}</h1>
						<p>{article.description}</p>
						<span>Read more...</span>
					</Link>
					<TagList article={article} />
				</div>
			))}
		</div>
	)
}

export default Feed
