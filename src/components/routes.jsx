import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalFeed from '../pages/feed/globalFeed/GlobalFeed'
import Article from '../pages/acricle/Article'
import Auth from '../pages/auth/Auth'
import TagFeed from '../pages/feed/tagFeed/TagFeed'
import YourFeed from '../pages/feed/yourFeed/YourFeed'
import CreateArticle from '../pages/acricle/CreateArticle'
import EditArticle from '../pages/acricle/EditArticle'
import Settings from '../pages/profile/Settings'
import Profile from '../pages/profile/Profile'
import ProfileFavorites from '../pages/profile/components/ProfileFavorites'

const MyRoutes = () => {
	return (
		<Routes>
			<Route path='/register' element={<Auth />} />
			<Route path='/login' element={<Auth />} />
			<Route path='/profiles/:slug' element={<Profile />} />
			<Route path='/profiles/:slug/favorites' element={<ProfileFavorites />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/' element={<GlobalFeed />} />
			<Route path='/feed' element={<YourFeed />} />
			<Route path='/tags/:slug' element={<TagFeed />} />
			<Route path='/articles/:slug' element={<Article />} />
			<Route path='/articles/new' element={<CreateArticle />} />
			<Route path='/articles/:slug/edit' element={<EditArticle />} />
		</Routes>
	)
}

export default MyRoutes
