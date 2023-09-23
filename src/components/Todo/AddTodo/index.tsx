import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { nanoid } from '@reduxjs/toolkit';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from 'types/todo';
import { sleep } from 'utils/misc';

interface Props {
  onAddTodo: (todo: Todo) => void;
}

const AddTodo = (props: Props) => {
  const { onAddTodo } = props;
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Delay
      await sleep(2000);

      const todo: Todo = {
        id: nanoid(),
        title: value.trim(),
        isCompleted: false,
        isDelete: false,
      };

      onAddTodo(todo);

      setValue('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleAddTodo}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        mb: 1.5,
      }}
    >
      <TextField
        placeholder="Add new todo"
        sx={{ flexGrow: 1 }}
        value={value}
        onChange={handleChange}
      />
      <LoadingButton
        loading={loading}
        variant="contained"
        startIcon={<AddIcon />}
        loadingPosition="start"
        size="medium"
        type="submit"
      >
        Add
      </LoadingButton>
    </Box>
  );
};

export default AddTodo;
