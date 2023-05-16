import { FC, useState } from 'react';
import ModalWindow from '@/components/UI/ModalWindow';
import TextField from '@mui/material/TextField';
import AppDatePicker from '@/components/UI/AppDatePicker';
import Button from '@mui/material/Button';
import cl from './AddTodoWindow.module.scss';
import { useAppDispatch } from '@/hooks/redux';
import { addTodo } from '@/store/slices/todo.slice';
import { v4 as uuid } from 'uuid';

interface IAddTodoWindowProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const AddTodoWindow: FC<IAddTodoWindowProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    title: '',
    description: '',
  });

  const [dueDate, setDueDate] = useState(null);

  const handleInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: uuid(),
      title: data.title,
      description: data.description,
      //@ts-ignore
      dueDate: dueDate.$d.toLocaleDateString('en-US'),
      completed: false,
    };

    dispatch(addTodo(newTodo));

    setData({
      title: '',
      description: '',
    });
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
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          label='Due date'
        />
        <Button onClick={handleAddTodo} variant='contained'>
          Add
        </Button>
        <Button onClick={handleCloseModal} variant='contained' color='error'>
          Close
        </Button>
      </div>
    </ModalWindow>
  );
};

export default AddTodoWindow;
