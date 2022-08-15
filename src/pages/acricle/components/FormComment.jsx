import React, { useContext, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { CurrentUserContext } from '../../../context/currentUser'

const FormComment = ({ slug }) => {
	const apiUrl = `/articles/${slug}/comments`
	const [currentUserState] = useContext(CurrentUserContext)
	const [response, doFetch] = useFetch(apiUrl)
	const [comment, setComment] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		doFetch({
			method: 'post',
			data: {
				comment: {
					body: comment,
				},
			},
		})
	}

	if (response.isLoading || response === null) {
		setTimeout(() => document.location.reload(), 1000)
	}

	return (
		<form className='card comment-form ng-untouched ng-pristine ng-valid' onSubmit={handleSubmit}>
			<fieldset>
				<div className='card-block'>
					<textarea className='form-control ng-untouched ng-pristine ng-valid'
					          placeholder='Write a comment...' rows='3' value={comment}
					          onChange={(e) => setComment(e.target.value)} />
				</div>
				<div className='card-footer'>
					
					<button className='btn btn-sm btn-primary' type='submit'> Post Comment
					</button>
				</div>
			</fieldset>
		</form>
	)
}

export default FormComment