import React from 'react'
import { Link } from 'react-router-dom'

const TagList = ({ article }) => {
	return (
		<ul className='tag-list'>
			{article.tagList.map((tag) => (
				<Link to={`/tags/${tag}`} key={tag}>
					<li className='tag-default tag-pill tag-outline'>{tag}</li>
				</Link>
			))}
		</ul>
	)
}

export default TagList
