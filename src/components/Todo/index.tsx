import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Todo } from 'types/todo';
import AddTodo from './AddTodo';
import Title from './Title';
import TodoList from './TodoList';

const TODOS: Todo[] = [
  {
    id: nanoid(),
    title: 'Learn Reactjs',
    isCompleted: false,
    isDelete: false,
  },
  {
    id: nanoid(),
    title: 'Learn TypeScript',
    isCompleted: true,
    isDelete: false,
  },
  {
    id: nanoid(),
    title: 'Learn JavaScript',
    isCompleted: false,
    isDelete: false,
  },
];

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => TODOS);

  // Lifting State Up
  const handleAddTodo = (todo: Todo) => {
    setTodos((prevState) => [...prevState, todo]);
  };

  const handleToggleCompleteTodo = (todoId: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDeleteTodo = (todoId: string) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  return (
    <Box sx={{ mt: 15 }}>
      <Container maxWidth="sm">
        <Title />

        <AddTodo onAddTodo={handleAddTodo} />

        <TodoList
          todos={todos}
          onCompleteTodo={handleToggleCompleteTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </Container>
    </Box>
  );
};

export default Index;
