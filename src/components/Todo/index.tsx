import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { nanoid } from '@reduxjs/toolkit';
import DeleteTodo from 'components/DeleteTodo';
import { useCallback, useMemo, useState } from 'react';
import { Todo, TodoFilter } from 'types/todo';
import { sleep } from 'utils/misc';
import AddTodo from './AddTodo';
import Filters from './Filter';
import Search from './Search';
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
  const [searchText, setSearchText] = useState<string>('');
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [todo, setTodo] = useState<Todo | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // Add todo
  const handleAddTodo = (todo: Todo) => {
    setTodos((prevState) => [...prevState, todo]);
  };

  // Change todo status
  const handleToggleCompleteTodo = useCallback(
    (todoId: string) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });

      setTodos(newTodos);
    },
    [todos]
  );

  // Delete todo
  const handleOpenDeleteTodo = useCallback((todo: Todo) => {
    setTodo(todo);
    setOpen(true);
  }, []);

  const handleCloseDeleteTodo = async () => {
    setOpen(false);
    await sleep(350); // Khoảng thời gian transition unmount của modal
    setTodo(null);
  };

  const handleDeleteTodo = async () => {
    if (!todo) return;

    await sleep(1000);

    const newTodos = todos.map((item) => {
      if (item.id === todo.id) {
        // Soft delete
        return { ...item, isDelete: true };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const handleSearchTodo = (value: string) => {
    setSearchText(value);
  };

  const filteredTodos = useMemo(() => {
    const newTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // if (filter === 'completed') {
    //   return newTodos.filter((todo) => todo.isCompleted);
    // } else if (filter === 'uncompleted') {
    //   return newTodos.filter((todo) => !todo.isCompleted);
    // } else if (filter === 'deleted') {
    //   return newTodos.filter((todo) => todo.isDelete);
    // } else {
    //   return newTodos;
    // }

    // Khi mà kiểm tra cùng một điều kiện, thì nên dùng switch cho rõ ràng
    switch (filter) {
      case 'completed': {
        return newTodos.filter((todo) => todo.isCompleted);
      }
      case 'uncompleted': {
        return newTodos.filter((todo) => !todo.isCompleted);
      }
      case 'deleted': {
        return newTodos.filter((todo) => todo.isDelete); // = todo.isDelete === true
      }
      default: {
        return newTodos.filter((todo) => !todo.isDelete);
      }
    }
  }, [todos, filter, searchText]);

  const handleFilterTodo = (filter: TodoFilter) => {
    setFilter(filter);
  };

  return (
    <Box sx={{ mt: 15 }}>
      <Container maxWidth="sm">
        <Title />

        <Search onSearch={handleSearchTodo} />

        <AddTodo onAddTodo={handleAddTodo} />

        <Filters filter={filter} onFilter={handleFilterTodo} />

        <TodoList
          todos={filteredTodos}
          onCompleteTodo={handleToggleCompleteTodo}
          onDeleteTodo={handleOpenDeleteTodo}
        />
      </Container>

      <DeleteTodo
        open={open}
        todo={todo}
        onClose={handleCloseDeleteTodo}
        onDelete={handleDeleteTodo}
      />
    </Box>
  );
};

export default Index;

// Câu lệnh điều kiện trong JavaScript, sẽ tự động convert statement (biểu thức) sang kiểu boolean; ngoài ra còn có filter, every, some (tức là những phương thức có điều kiện)
// Truthy: true, vd: 1, '1', {}, [], ...
// Falsy: false, vd: 0, '', null, undefined, NaN, ...

// newTodos.filter((todo) => todo.isDelete)
// newTodos.filter((todo) => todo.isDelete === true)

// newTodos.filter((todo) => !todo.isDelete)
// newTodos.filter((todo) => todo.isDelete === false)

if ([1, 2, 3]) {
}

// Bản chất, hình dung như là if(Boolean(3)) {}

// Có hai cách để conver một giá trị sang boolean
// 1. Boolean(value)
// 2. !!value (!! gọi là double bang operator)
