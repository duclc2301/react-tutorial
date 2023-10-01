import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Todo } from 'types/todo';

interface Props {
  open: boolean;
  onClose: () => void;
  todo: Todo | null;
  onDelete: () => Promise<void>;
}

const DeleteTodo = (props: Props) => {
  const { open, onClose, todo, onDelete } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await onDelete(); // = await sleep(1000); (dòng 77)

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{todo?.title}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          variant="contained"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodo;
