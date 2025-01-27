'use client'

import React, { useState, useEffect } from 'react'
import {
	TextField,
	Button,
	List,
	ListItemText,
	IconButton,
	Typography,
	Box,
	ListItemButton,
	ListItem
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

interface Todo {
	id: number
	text: string
	completed: boolean
}

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const [newTodo, setNewTodo] = useState<string>('')
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

	useEffect(() => {
		const savedTodos = localStorage.getItem('todos')
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const addTodo = () => {
		if (newTodo.trim() === '') return
		const newTodoItem: Todo = {
			id: Date.now(),
			text: newTodo,
			completed: false
		}
		setTodos([...todos, newTodoItem])
		setNewTodo('')
	}

	const editTodo = (todo: Todo) => {
		setEditingTodo(todo)
		setNewTodo(todo.text)
	}

	const updateTodo = () => {
		if (editingTodo) {
			setTodos(
				todos.map((todo) =>
					todo.id === editingTodo.id
						? { ...todo, text: newTodo }
						: todo
				)
			)
			setEditingTodo(null)
			setNewTodo('')
		}
	}

	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		)
	}

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id))
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (editingTodo) {
				updateTodo()
			} else {
				addTodo()
			}
		}
	}

	return (
		<Box>
			<Typography variant="h5">To-Do List</Typography>
			<Box my={2} gap={2} display="flex">
				<TextField
					label="Add a new task"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={handleKeyPress}
					variant="outlined"
					fullWidth
					sx={{
						'&::placeholder': {
							color: 'rgba(255, 255, 255, 0.5)' // Customize the placeholder color here
						}
					}}
				/>
				<Button
					onClick={editingTodo ? updateTodo : addTodo}
					variant="contained"
					color="primary"
				>
					{editingTodo ? 'Update' : 'Add'}
				</Button>
			</Box>
			<Box
				className="overflow-y-auto"
				sx={{ maxHeight: 'calc(100vh - 300px)' }}
			>
				<List>
					{todos.map((todo) => (
						<ListItem key={todo.id} disablePadding>
							<ListItemButton
								component="li"
								onClick={() => toggleTodo(todo.id)}
								sx={{
									backgroundColor: todo.completed
										? 'rgba(0, 0, 0, 0.1)'
										: 'transparent'
								}}
							>
								<ListItemText
									primary={todo.text}
									sx={{
										textDecoration: todo.completed
											? 'line-through'
											: 'none'
									}}
								/>
								<IconButton
									disabled={todo.completed}
									onClick={(e) => {
										e.stopPropagation()
										editTodo(todo)
									}}
								>
									<Edit
										color={
											todo.completed
												? 'disabled'
												: 'primary'
										}
									/>
								</IconButton>
								<IconButton
									onClick={(e) => {
										e.stopPropagation()
										deleteTodo(todo.id)
									}}
								>
									<Delete color="primary" />
								</IconButton>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	)
}

export default TodoList
