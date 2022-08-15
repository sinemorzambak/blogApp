import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useStorage from '../../hooks/useStorage'
import { CurrentUserContext } from '../../context/currentUser'
import ErrorMessage from '../../components/ErrorMessage'

const Auth = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
	const [, setToken] = useStorage('token')
	const [, dispatch] = useContext(CurrentUserContext)

	const location = useLocation()
	const navigate = useNavigate()

	const isLogin = location.pathname === '/login'
	const pageTitle = isLogin ? 'Sign in' : 'Sign up'
	const pageDesc = isLogin ? 'Need an account?' : 'Have an account?'
	const pageLink = isLogin ? '/register' : '/login'

	const apiUrl = isLogin ? '/users/login' : '/users'
	const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)

	const handleSubmit = (e) => {
		e.preventDefault()
		const user = isLogin ? { email, password } : { email, password, username }

		doFetch({
			method: 'post',
			data: {
				user,
			},
		})
	}

	useEffect(() => {
		if (!response) {
			return
		}
		setToken(response.user.token)
		setIsSuccessSubmit(true)
		dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
		if (isSuccessSubmit) {
			return navigate('/')
		}
	}, [response, setToken, navigate, isSuccessSubmit, dispatch])

	return (
		<div className='auth-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-center'>{pageTitle}</h1>
						<p className='text-center'>
							<Link to={pageLink}>{pageDesc}</Link>
						</p>
						<form onSubmit={handleSubmit}>
							{error && <ErrorMessage error={error.errors} />}
							<fieldset>
								{!isLogin && (
									<fieldset className='form-group'>
										<input
											required
											type='text'
											className='form-control form-control-lg mt-3'
											placeholder='Username'
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</fieldset>
								)}
								<fieldset className='form-group'>
									<input
										required
										type='email'
										className='form-control form-control-lg mt-3'
										placeholder='Email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										required
										type='password'
										className='form-control form-control-lg mt-3'
										placeholder='Password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</fieldset>
								<button className='btn btn-primary mt-3' type='submit' disabled={isLoading}>
									{pageTitle}
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth
