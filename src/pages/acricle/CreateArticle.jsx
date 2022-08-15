import React, { useContext, useEffect, useState } from 'react'
import ArticleForm from './components/ArticleForm'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../context/currentUser'

const CreateArticle = () => {
	const navigate = useNavigate()
	const apiUrl = '/articles'
	const [{ response, error }, doFetch] = useFetch(apiUrl)
	const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
	const [currentUserState] = useContext(CurrentUserContext)

	const initialValue = {
		title: '',
		description: '',
		body: '',
		tagList: [],
	}

	useEffect(() => {
		if (currentUserState.isLoggedIn === false) {
			navigate('/')
		}
		if (!response) {
			return
		}
		setIsSuccessSubmit(true)
		if (isSuccessSubmit) {
			navigate(`/articles/${response.article.slug}`)
		}
	}, [response, isSuccessSubmit, navigate, currentUserState.isLoggedIn])

	const handleSubmit = (article) => {
		doFetch({
			method: 'post',
			data: {
				article,
			},
		})
	}

	return (
		<div>
			<ArticleForm error={(error && error.errors) || {}} initialValue={initialValue} onSubmit={handleSubmit} />
		</div>
	)
}

export default CreateArticle
