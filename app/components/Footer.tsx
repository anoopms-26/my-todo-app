'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer: React.FC = () => {
	return (
		<Box
			component="footer"
			className="w-full p-4 text-center bg-gray-800 text-white mt-auto"
		>
			<Typography variant="body2" color="inherit">
				© 2025 My To-Do App
			</Typography>
		</Box>
	)
}

export default Footer
