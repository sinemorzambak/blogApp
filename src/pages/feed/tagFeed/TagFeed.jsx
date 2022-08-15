import React, { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Banner from '../components/Banner'
import FeedRow from '../components/FeedRow'

const TagFeed = () => {
	const slug = useParams()
	const apiUrl = `/articles?limit=10&offset=0&tag=${slug.slug}`
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch, slug])

	return (
		<div className='home-page'>
			<Banner />
			<FeedRow response={response} error={error} isLoading={isLoading} />
		</div>
	)
}

export default TagFeed
