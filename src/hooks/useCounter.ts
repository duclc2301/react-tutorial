import CounterContext from 'context/CounterContext';
import { useContext } from 'react';

const useCounter = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error('CounterContext must be used within a CounterProvider');
  }

  return context;
};

export default useCounter;
