import useCounter from 'hooks/useCounter';
import { FCC } from 'types/react';

const Counter = () => {
  return (
    <div>
      <Parent>
        <Child />
      </Parent>
    </div>
  );
};

const Parent: FCC = (props) => {
  const { children } = props;

  return (
    <div>
      <div>Parent</div>
      {children}
    </div>
  );
};

const Child: FCC = (props) => {
  const counter = useCounter();

  return (
    <div>
      <div>Child</div>
      Counter: {counter}
    </div>
  );
};

export default Counter;
