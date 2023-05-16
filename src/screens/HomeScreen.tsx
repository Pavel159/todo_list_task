import TodoList from '@/components/todo-list/TodoList';
import { FC } from 'react';

const HomeScreen: FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Current todos</h1>
      <TodoList />
    </div>
  );
};

export default HomeScreen;
