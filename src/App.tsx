import { ThemeProvider } from '@mui/material';
import Todo from 'components/Todo';
import theme from 'theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Todo />
    </ThemeProvider>
  );
}

export default App;

// Ajax xhr http request, callback, callback hell, race, sequence, parallel
// Promise
// Async await

// Event loop (stack (LIFO), callback queue (FIFO))
