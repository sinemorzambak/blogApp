import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import useStorage from './useStorage'

const useFetch = (url) => {
	const baseUrl = 'https://api.realworld.io/api'
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [options, setOptions] = useState({})
	const [token] = useStorage('token')

	const doFetch = useCallback((options) => {
		setOptions(options)
		setIsLoading(true)
	}, [])

	useEffect(() => {
		let skipGetResponseAfterDie = false
		const requestOptions = {
			...options,
			...{
				headers: {
					authorization: token ? `Token ${token}` : '',
				},
			},
		}
		if (!isLoading) {
			return
		}
		axios(baseUrl + url, requestOptions)
			.then((res) => {
				if (!skipGetResponseAfterDie) {
					setIsLoading(false)
					setResponse(res.data)
				}
			})
			.catch((error) => {
				if (!skipGetResponseAfterDie) {
					setIsLoading(false)
					setError(error.response.data)
				}
			})

		return () => {
			skipGetResponseAfterDie = true
		}
	}, [isLoading, options, token, url])

	return [{ isLoading, response, error }, doFetch]
}

export default useFetch
