import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { FC, useMemo, useState } from 'react';
import cl from './TodoList.module.scss';
import TodoItem from './todo-item/TodoItem';
import AddTodoWindow from './add-todo-window/AddTodoWindow';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { sortTodos } from '@/store/slices/todo.slice';
import { TextField } from '@mui/material';

const TodoList: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { todos } = useAppSelector((state) => state.todoReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const searchedTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, todos]);

  return (
    <div className={cl.todoList}>
      {location.pathname !== '/completed' && (
        <div>
          <Button onClick={handleOpenModal} variant='contained'>
            Add new Todo
          </Button>
        </div>
      )}

      <div className={cl.toolBar}>
        <div className={cl.sortBar}>
          <span className={cl.sortBy}>Sort by:</span>
          <ButtonGroup variant='contained'>
            <Button onClick={() => dispatch(sortTodos('title'))}>Title</Button>
            <Button onClick={() => dispatch(sortTodos('description'))}>
              Description
            </Button>
            <Button onClick={() => dispatch(sortTodos('dueDate'))}>
              Due date
            </Button>
          </ButtonGroup>
        </div>

        <div className={cl.searchBar}>
          <span className={cl.searchBy}>Search by title: </span>
          <TextField
            variant='standard'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={cl.todosContainer}>
        {searchedTodos.map((todo) =>
          location.pathname === '/completed'
            ? todo.completed && (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  dueDate={todo.dueDate}
                  completed={todo.completed}
                />
              )
            : !todo.completed && (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  dueDate={todo.dueDate}
                  completed={todo.completed}
                />
              )
        )}
      </div>

      <AddTodoWindow
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default TodoList;
