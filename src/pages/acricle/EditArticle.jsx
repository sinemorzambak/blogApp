import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from './components/ArticleForm'
import { CurrentUserContext } from '../../context/currentUser'

const EditArticle = () => {
	const { slug } = useParams()
	const apiUrl = `/articles/${slug}`
	const navigate = useNavigate()

	const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
	const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] = useFetch(apiUrl)
	const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl)
	const [currentUserState] = useContext(CurrentUserContext)
	const [initialValues, setInitialValues] = useState(null)

	const handleSubmit = (article) => {
		doUpdateArticle({
			method: 'put',
			data: {
				article,
			},
		})
	}

	useEffect(() => {
		doFetchArticle()
	}, [doFetchArticle])

	useEffect(() => {
		if (!fetchArticleResponse) {
			return
		}

		setInitialValues({
			title: fetchArticleResponse.article.title,
			description: fetchArticleResponse.article.description,
			body: fetchArticleResponse.article.body,
			tagList: fetchArticleResponse.article.tagList,
		})
	}, [fetchArticleResponse])

	useEffect(() => {
		if (!updateArticleResponse) {
			return
		}
		setIsSuccessSubmit(true)
	}, [updateArticleResponse])

	useEffect(() => {
		if (isSuccessSubmit) {
			navigate(`/articles/${updateArticleResponse.article.slug}`)
		}
		if (currentUserState.isLoggedIn === null) {
			return null
		}
		if (currentUserState.isLoggedIn === false) {
			navigate('/')
		}
	}, [navigate, isSuccessSubmit])


	return (
		<ArticleForm
			onSubmit={handleSubmit}
			error={(updateArticleError && updateArticleError.errors) || {}}
			initialValue={initialValues}
			slug={slug}
		/>
	)
}

export default EditArticle
