import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

const PopularTags = () => {
	const apiUrl = '/tags'
	const [{ response, isLoading }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch])

	return (
		<div>
			<div className='sidebar'>
				{isLoading && <div>Loading...</div>}
				{!isLoading && response && (
					<Fragment>
						<p>Popular Tags</p>
						<div className='tag-list'>
							{response &&
								response.tags.map((tag) => (
									<Link className='tag-default tag-pill' to={`/tags/${tag}`} key={tag}>
										{tag}
									</Link>
								))}
						</div>
					</Fragment>
				)}
			</div>
		</div>
	)
}

export default PopularTags
