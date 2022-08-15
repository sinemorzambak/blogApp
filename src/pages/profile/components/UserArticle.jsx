import React, { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Feed from '../../feed/components/Feed'

const UserArticle = () => {
	const { slug } = useParams()
	const apiUrl = `/articles?author=${slug}&limit=10&offset=0`
	const [{ response }, doFetch] = useFetch(apiUrl)
	useEffect(() => {
		doFetch()
	}, [doFetch])
	if (!response) {
		return null
	}
	return (
		<Feed articles={response.articles} />
	)
}

export default UserArticle