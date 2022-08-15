import React, { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import Banner from '../components/Banner'
import FeedRow from '../components/FeedRow'

const GlobalFeed = () => {
	const apiUrl = '/articles?limit=30&offset=0'
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

export default GlobalFeed
