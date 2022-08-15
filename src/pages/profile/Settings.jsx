import React, { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../context/currentUser'
import useFetch from '../../hooks/useFetch'
import useStorage from '../../hooks/useStorage'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
	const apiUrl = '/user'
	const navigate = useNavigate()
	const [currentUserState, dispatch] = useContext(CurrentUserContext)
	const [{ response, error }, doFetch] = useFetch(apiUrl)
	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const [bio, setBio] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [, setToken] = useStorage('token')

	const handleSubmit = event => {
		event.preventDefault()
		doFetch({
			method: 'put',
			data: {
				user: {
					...currentUserState.currentUser,
					image,
					bio,
					username: name,
					email,
					password,
				},
			},
		})
	}

	const handleLogout = (e) => {
		e.preventDefault()
		setToken('')
		dispatch({ type: 'LOGOUT' })
		navigate('/')
	}

	useEffect(() => {
		if (!currentUserState.currentUser) {
			return
		}
		const currentUser = currentUserState.currentUser

		setName(currentUser.username)
		setImage(currentUser.image)
		setBio(currentUser.bio)
		setEmail(currentUser.email)
	}, [currentUserState.currentUser])

	useEffect(() => {
		if (!response) {
			return
		}
		dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
		navigate('/')
	}, [response, dispatch, navigate])

	return (
		<div className='settings-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Your settings</h1>
						<form>
							<fieldset>
								<fieldset className='form-group'>
									<input type='text'
									       className='form-control form-control-lg'
									       placeholder='URL of profile picture'
									       onChange={(e) => setImage(e.target.value)}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input type='text'
									       className='form-control form-control-lg'
									       placeholder='Username'
									       value={name} onChange={(e) => setName(e.target.value)} />
								</fieldset>
								<fieldset className='form-group'>
									<textarea className='form-control form-control-lg' rows='8'
									          placeholder='Short bio' value={bio}
									          onChange={(e) => setBio(e.target.value)} />
								</fieldset>
								<fieldset className='form-group'>
									<input type='text'
									       className='form-control form-control-lg'
									       placeholder='Email'
									       value={email} onChange={(e) => setEmail(e.target.value)} />
								</fieldset>
								<fieldset className='form-group'>
									<input type='text'
									       className='form-control form-control-lg'
									       placeholder='Password'
									       value={password} onChange={(e) => setPassword(e.target.value)} />
								</fieldset>
								<fieldset className='form-group'
								          style={{
									          display: 'flex',
									          justifyContent: 'space-between',
									          flexDirection: 'row-reverse',
								          }}>
									<button className='btn btn pull-xs-right btn-primary' onClick={handleSubmit}>Update
										settings
									</button>
									<button className='btn btn pull-xs-left btn-danger' onClick={handleLogout}>
										Logout
									</button>
								</fieldset>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings