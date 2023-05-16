import { FC } from 'react';
import cl from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <div className={cl.header}>
      <Link to='/'>Current Todos</Link>
      <Link to='/completed'>Completed Todos</Link>
    </div>
  );
};

export default Header;
