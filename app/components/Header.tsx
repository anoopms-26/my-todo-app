'use client'

import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Header: React.FC = () => {
	return (
		<AppBar position="static" sx={{ mb: 2 }}>
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					My To-Do App
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header
