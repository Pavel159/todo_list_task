import { BrowserRouter } from 'react-router-dom';
import '@/App.css';
import AppRouter from '@/components/app-router';
import Header from '@/components/header/Header';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
