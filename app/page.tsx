'use client'

import React from 'react'
import TodoList from './components/TodoList/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'
import { Grid2, Container } from '@mui/material'

const Home: React.FC = () => {
	return (
		<Grid2 className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
			<Header />
			<Container className="flex-grow">
				<TodoList />
			</Container>
			<Footer />
		</Grid2>
	)
}

export default Home
