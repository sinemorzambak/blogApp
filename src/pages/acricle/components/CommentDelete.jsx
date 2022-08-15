import React from 'react'
import useFetch from '../../../hooks/useFetch'

const CommentDelete = ({ slug, id }) => {
	const apiDelete = `/articles/${slug}/comments/${id}`
	const [response, doFetchDelete] = useFetch(apiDelete)
	const handleDelete = () => {
		doFetchDelete({
			method: 'delete',
		})
	}

	if (response.isLoading || response === null) {
		setTimeout(() => document.location.reload(), 1000)
	}

	return (
		<i className='ion-trash-a' onClick={handleDelete} />
	)
}

export default CommentDelete