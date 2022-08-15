import { createContext, useContext, useEffect, useReducer } from 'react'
import useFetch from '../hooks/useFetch'
import useStorage from '../hooks/useStorage'

const initialState = {
	isLoading: false,
	isLoggedIn: null,
	currentUser: null,
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				...state,
				isLoading: true,
			}
		case 'SET_AUTHORIZED':
			return {
				...state,
				isLoggedIn: true,
				isLoading: false,
				currentUser: action.payload,
			}
		case 'SET_UNAUTHORIZED':
			return {
				...state,
				isLoggedIn: false,
			}
		case 'LOGOUT':
			return {
				...initialState,
				isLoggedIn: false
			}
		default:
			return {
				state,
			}
	}
}

const newState = reducer(initialState, { type: 'LOGOUT' })

const CurrentUserContext = createContext([{}, () => {
}])

const CurrentUserProvider = ({ children }) => {
	const value = useReducer(reducer, initialState)
	return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}

const CurrentUserChecker = ({ children }) => {
	const [{ response }, doFetch] = useFetch('/user')
	const [, dispatch] = useContext(CurrentUserContext)
	const [token] = useStorage('token')

	useEffect(() => {
		if (!token) {
			dispatch({ type: 'SET_UNAUTHORIZED' })
			return
		}

		doFetch()
		dispatch({ type: 'LOADING' })
	}, [token, doFetch, dispatch])

	useEffect(() => {
		if (!response) {
			return
		}
		dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
	}, [dispatch, response])

	return children
}

export { CurrentUserContext, CurrentUserProvider, CurrentUserChecker }
