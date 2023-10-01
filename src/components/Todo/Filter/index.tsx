import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TodoFilter } from 'types/todo';

interface Props {
  filter: TodoFilter;
  onFilter: (filter: TodoFilter) => void;
}
const Filters = (props: Props) => {
  const { filter, onFilter } = props;

  // const handleFilterAll = () => {
  //   onFilter('all');
  // };

  // const handleFilterCompleted = () => {
  //   onFilter('completed');
  // };

  // const handleFilterUncompleted = () => {
  //   onFilter('uncompleted');
  // };

  // const handleFilterDeleted = () => {
  //   onFilter('deleted');
  // };

  const handleFilter = (filter: TodoFilter) => () => {
    onFilter(filter);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <Button
        variant={filter === 'all' ? 'contained' : 'outlined'}
        onClick={handleFilter('all')}
      >
        All
      </Button>
      <Button
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        onClick={handleFilter('completed')}
      >
        Completed
      </Button>
      <Button
        variant={filter === 'uncompleted' ? 'contained' : 'outlined'}
        onClick={handleFilter('uncompleted')}
      >
        Uncompleted
      </Button>
      <Button
        variant={filter === 'deleted' ? 'contained' : 'outlined'}
        onClick={handleFilter('deleted')}
      >
        Deleted
      </Button>
    </Box>
  );
};

export default Filters;
