export interface Todo {
  id: string;
  title: string;
  isDelete: boolean;
  isCompleted: boolean;
}

export type TodoFilter = 'all' | 'completed' | 'uncompleted' | 'deleted'; // Union
