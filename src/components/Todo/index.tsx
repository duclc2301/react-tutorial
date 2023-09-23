import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { nanoid } from '@reduxjs/toolkit';
import { useCallback, useMemo, useState } from 'react';
import { Todo } from 'types/todo';
import AddTodo from './AddTodo';
import Search from './Search';
import Title from './Title';
import TodoList from './TodoList';
import FlashOnIcon from '@mui/icons-material/FlashOn';

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

  // Fake re-render
  const [count, setCount] = useState<number>(0);

  // Lifting State Up
  const handleAddTodo = (todo: Todo) => {
    setTodos((prevState) => [...prevState, todo]);
  };

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

  const handleDeleteTodo = useCallback(
    (todoId: string) => {
      const newTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(newTodos);
    },
    [todos]
  );

  const handleSearchTodo = (value: string) => {
    setSearchText(value);
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    [todos, searchText]
  );

  console.log('App render');

  const handleSetCount = () => {
    setCount((prevState) => prevState + 1);
  };

  return (
    <Box sx={{ mt: 15 }}>
      <Container maxWidth="sm">
        <Title />

        <Search onSearch={handleSearchTodo} />

        <AddTodo onAddTodo={handleAddTodo} />

        <TodoList
          todos={filteredTodos}
          onCompleteTodo={handleToggleCompleteTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        <Button
          onClick={handleSetCount}
          startIcon={<FlashOnIcon />}
          color="error"
        >
          Re-render
        </Button>
      </Container>
    </Box>
  );
};

export default Index;

// Phân tích

/*
Đầu tiên thì khi component cha re-render thì component con cũng re-render theo (mặc định).

Nhưng sẽ có trường hợp mình cần tối ưu component con, tức là khi nó bị re-render bởi một tác nhân (state khác,...) khác mà nó không liên quan tới, cụ thể ở đây là component cha re-render nhưng props của bản thân component con đó không thay đổi.

Ví dụ như component TodoList, nó phụ thuộc vào 3 giá trị: todos, onCompleteTodo và onDeleteTodo, thì đúng ra thì nó chỉ nên re-render lại khi 1 trong 3 giá trị này thay đổi, còn nếu không thì nó không cần re-render lại (đây là điều mong muốn).

Bởi vì sau này có thể có hàng trăm mục Todo, nên việc re-render lại toàn bộ TodoList khi một Todo thay đổi là không cần thiết và không tối ưu.


Biện pháp xử lý:
1. Sử dụng useMemo để ghi nhớ tính toán, giá trị của filteredTodos chỉ thay đổi khi và chỉ khi todos và searchText thay đổi.
 - todos thay đổi khi mình thêm một mục todo, khi đánh dấu đã hoàn thành, khi xóa,...
 - searchText thay đổi khi mình nhập vào ô search.
 Ngoài hai điều kiện này ra thì filteredTodos sẽ không bị tính toán lại.
2. Sử dụng useCallback để ghi nhớ hàm, giá trị của handleToggleCompleteTodo và handleDeleteTodo chỉ thay đổi khi và chỉ khi todos thay đổi.

Vậy thì useMemo và useCallback có gì khác nhau?
- useMemo: ghi nhớ một giá trị được tính toán, một biểu thức phức tạp sẽ chỉ tính toán lại khi và chỉ khi các giá trị phụ thuộc thay đổi. Cụ thể ở đây là danh sách Todo, nó chỉ tính toán lại khi todos và searchText thay đổi.
- useCallback: ghi nhớ một hàm, giá trị của hàm chỉ thay đổi khi và chỉ khi các giá trị phụ thuộc thay đổi. Cụ thể ở đây là danh sách Todo, nó chỉ tính toán lại khi todos thay đổi.
=> khi cần ghi nhớ giá trị thì sử dụng useMemo, khi cần ghi nhớ một hàm callback, thì sử dụng useCallback.

3. Sử dụng memo để tối ưu component TodoList, nó chỉ re-render lại khi và chỉ khi props của nó thay đổi.

Mặc dù đã tối ưu các giá trị bên trong props của TodoList là todos, onCompleteTodo và onDeleteTodo, nhưng bản thân props cũng là một đối tượng, nên nó vẫn bị thay đổi khi component cha re-render, do đó, chúng ta sử dụng memo để kiểm tra từng giá trị có trong props, nếu có giá trị nào thay đổi, thì component TodoList mới re-render lại, còn không thì không.
*/
