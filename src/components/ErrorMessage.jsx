import React from 'react'

const ErrorMessage = ({ error }) => {
	const errorMessages = Object.keys(error).map(name => {
		const messages = error[name].join(' ')
		return `${name} ${messages}`
	})
	return (
		<ul className='error-messages'>
			{errorMessages.map(errorMessage => {
				return <li key={errorMessage}>{errorMessage}</li>
			})}
		</ul>
	)
}

export default ErrorMessage
