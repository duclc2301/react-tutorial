import { useState } from 'react';

const Test = () => {
  const [value, setValue] = useState<number>(0);

  const handleSetValue = (value: number) => {
    setValue(value);
  };

  return (
    <div>
      Paren
      <Child name="John Doe" onSetValue={handleSetValue} />
      <Sibling value={value} />
    </div>
  );
};

interface SiblingProps {
  value: number;
}
const Sibling = (props: SiblingProps) => {
  const { value } = props;
  return <div>Sibling: {value}</div>;
};

interface ChildProps {
  name: string;
  onSetValue: (value: number) => void;
}
const Child = (props: ChildProps) => {
  const { name, onSetValue } = props;
  return (
    <div>
      Child: Hi {name}
      <Child2 name={name} onSetValue={onSetValue} />
    </div>
  );
};

const Child2 = (props: ChildProps) => {
  const { name, onSetValue } = props;
  const age = 18;

  const handleSetValue = () => {
    onSetValue(age);
  };

  return (
    <div>
      Child2: Hi {name}
      <button onClick={handleSetValue}>Set value</button>
    </div>
  );
};

export default Test;

// Trong Reactjs, luồng dữ liệu là luồng dữ liệu một chiều (oneway data binding). Tức là truyền từ thành phần cha xuống thành phần con, và sử dụng `props`.
// React có cấu trúc hình cây, nên có thể truyền dữ liệu từ thành phần cha xuống thành phần con, nhưng không thể truyền ngược lại từ thành phần con lên thành phần cha.
// Muốn truyền dữ liệu từ thành phần con lên thành phần cha, ta cần sử dụng callback function. Kỹ thuật này gọi là Lift State Up. Ngoài ra sẽ có Context, Provider
