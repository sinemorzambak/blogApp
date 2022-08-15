function getDate(str) {
	let options = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	}
	let date = new Date(str)
	return date.toLocaleString('ru', options)
}

export default getDate