import { createContext, useState } from 'react';
import { FCC } from 'types/react';

const CounterContext = createContext<number | null>(null);

CounterContext.displayName = 'CounterContext';

export const CounterProvider: FCC = (props) => {
  const [counter, setCounter] = useState<number>(Math.random());

  const { children } = props;
  return (
    <CounterContext.Provider value={counter}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterContext;
