import { FC, useState } from 'react';
import ModalWindow from '@/components/UI/ModalWindow';
import TextField from '@mui/material/TextField';
import AppDatePicker from '@/components/UI/AppDatePicker';
import Button from '@mui/material/Button';
import cl from './EditTodoWindow.module.scss';
import { useAppDispatch } from '@/hooks/redux';
import { editTodo } from '@/store/slices/todo.slice';
import { ITodo } from '@/models/ITodo';
import dayjs from 'dayjs';

interface IEditTodoWindowProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  todo: ITodo;
}

const EditTodoWindow: FC<IEditTodoWindowProps> = ({
  isModalOpen,
  handleCloseModal,
  todo,
}) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    title: todo.title,
    description: todo.description,
  });

  const [dueDate, setDueDate] = useState(dayjs(todo.dueDate));

  const handleInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditTodo = () => {
    const editedTodo = {
      id: todo.id,
      title: data.title,
      description: data.description,
      //@ts-ignore
      dueDate: dueDate.$d.toLocaleDateString('en-US'),
      completed: false,
    };

    dispatch(editTodo(editedTodo));

    setData({
      title: '',
      description: '',
    });
    //@ts-ignore
    setDueDate(null);
    handleCloseModal();
  };

  return (
    <ModalWindow open={isModalOpen} handleClose={handleCloseModal}>
      <div className={cl.modalContent}>
        <TextField
          value={data.title}
          onChange={handleInputChange}
          name='title'
          label='Title'
          variant='outlined'
        />
        <TextField
          value={data.description}
          onChange={handleInputChange}
          name='description'
          label='Description'
          variant='outlined'
        />
        <AppDatePicker
          //@ts-ignore
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          label='Due date'
        />
        <Button onClick={handleEditTodo} variant='contained'>
          Confirm
        </Button>
        <Button onClick={handleCloseModal} variant='contained' color='error'>
          Close
        </Button>
      </div>
    </ModalWindow>
  );
};

export default EditTodoWindow;
