import TodoList from '@/components/todo-list/TodoList';
import { FC } from 'react';

const CompletedTasksScreen: FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Completed todos</h1>
      <TodoList />
    </div>
  );
};

export default CompletedTasksScreen;
