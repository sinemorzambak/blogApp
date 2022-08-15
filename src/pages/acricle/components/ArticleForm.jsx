import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../components/ErrorMessage'
import { Link } from 'react-router-dom'

const ArticleForm = ({ onSubmit, error, initialValue, slug }) => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [description, setDescription] = useState('')
	const [tagList, setTagList] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const article = {
			title,
			description,
			body,
			tagList: tagList.split(' '),
		}
		onSubmit(article)
	}

	useEffect(() => {
		if (!initialValue) {
			return
		}
		setBody(initialValue.body)
		setTitle(initialValue.title)
		setDescription(initialValue.description)
		setTagList(initialValue.tagList)
	}, [initialValue])

	return (
		<div className='editor-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-10 offset-md-1 col-xs-12'>
						<ErrorMessage error={error} />
						<form onSubmit={handleSubmit}>
							<fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Article title'
										value={title}
										onChange={(e) => {
											setTitle(e.target.value)
										}}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Description'
										value={description}
										onChange={(e) => {
											setDescription(e.target.value)
										}}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<textarea
										className='form-control'
										rows='8'
										placeholder='Write your article'
										value={body}
										onChange={(e) => {
											setBody(e.target.value)
										}}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Tag list'
										value={tagList}
										onChange={(e) => {
											setTagList(e.target.value)
										}}
									/>
								</fieldset>
								<fieldset className='form-group' style={{
									display: 'flex',
									justifyContent: 'space-between',
									flexDirection: 'row-reverse',
								}}>
									<button className='btn btn pull-xs-right btn-primary'>Publish article</button>
									<Link to={slug ? `/articles/${slug}` : '/'}
									      className='btn btn pull-xs-left btn-danger'>Go
										back</Link>
								</fieldset>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArticleForm
