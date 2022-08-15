import React from 'react'
import useFetch from '../../../hooks/useFetch'

const AddToFavorite = ({ isFavorited, favoritesCount, articleSlug, body }) => {
	const apiUrl = `/articles/${articleSlug}/favorite`
	const [{ response }, doFetch] = useFetch(apiUrl)
	const responseCount = response ? response.article.favoritesCount : favoritesCount
	const isFavoritedResponse = response ? response.article.favorited : isFavorited
	const handleLike = (e) => {
		e.preventDefault()
		doFetch({
			method: isFavoritedResponse ? 'delete' : 'post',
		})
	}

	return (

		<button className={`btn btn-sm ${isFavoritedResponse ? 'btn-primary' : 'btn-outline-primary'}`}
		        onClick={handleLike}>
			<i className='ion-heart' />
			<span> {responseCount}{body && (body)}</span>
		</button>
		
	)
}

export default AddToFavorite