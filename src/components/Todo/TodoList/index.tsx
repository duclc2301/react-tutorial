import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ChangeEvent, MouseEvent, memo } from 'react';
import { Todo } from 'types/todo';

interface Props {
  todos: Todo[];
  onCompleteTodo: (todoId: string) => void;
  onDeleteTodo: (todo: Todo) => void;
}
const TodoList = (props: Props) => {
  const { todos, onCompleteTodo, onDeleteTodo } = props;

  const handleChange =
    (todoId: string) => (_event: ChangeEvent<HTMLInputElement>) => {
      onCompleteTodo(todoId);
    };

  const handleDeleteTodo =
    (todo: Todo) => (_event: MouseEvent<HTMLButtonElement>) => {
      onDeleteTodo(todo);
    };

  return (
    <Box>
      {todos.map((todo) => {
        const { id, title, isCompleted } = todo;
        return (
          <Box
            key={id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textDecoration: isCompleted ? 'line-through' : 'none',
                color: isCompleted ? 'primary.main' : 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Checkbox checked={isCompleted} onChange={handleChange(id)} />
              <IconButton size="small" onClick={handleDeleteTodo(todo)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default memo(TodoList);
