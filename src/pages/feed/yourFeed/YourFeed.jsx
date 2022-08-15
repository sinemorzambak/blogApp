import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import useFetch from '../../../hooks/useFetch'
import FeedRow from '../components/FeedRow'

const YourFeed = () => {
	const apiUrl = '/articles/feed?limit=10&offset=0'
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch])

	return (
		<div className='home-page'>
			<Banner />
			<FeedRow response={response} error={error} isLoading={isLoading} />
		</div>
	)
}

export default YourFeed
