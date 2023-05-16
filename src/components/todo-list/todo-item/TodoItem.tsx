import { FC, useState } from 'react';
import cl from './TodoItem.module.scss';
import Button from '@mui/material/Button';
import { useAppDispatch } from '@/hooks/redux';
import { finishTodo, removeTodo } from '@/store/slices/todo.slice';
import EditTodoWindow from './edit-todo-window/EditTodoWindow';
import { useLocation } from 'react-router-dom';

interface ITodoProps {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
}

const TodoItem: FC<ITodoProps> = ({
  id,
  title,
  description,
  dueDate,
  completed,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleFinishTodo = () => {
    dispatch(finishTodo(id));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cl.todoItem}>
      <div className={cl.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Due date: {dueDate}</p>
      </div>
      {location.pathname !== '/completed' && (
        <div className={cl.buttons}>
          <Button
            onClick={handleFinishTodo}
            variant='contained'
            color='success'>
            Finish
          </Button>
          <Button onClick={handleOpenModal} variant='contained'>
            Edit
          </Button>
          <Button onClick={handleRemoveTodo} variant='contained' color='error'>
            Remove
          </Button>
        </div>
      )}

      <EditTodoWindow
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        todo={{ id, title, description, dueDate, completed }}
      />
    </div>
  );
};

export default TodoItem;
