import CompletedTasksScreen from '@/screens/CompletedTasksScreen';
import HomeScreen from '@/screens/HomeScreen';

export const routes = [
  { path: '/completed', element: <CompletedTasksScreen /> },
  { path: '/', element: <HomeScreen /> },
];
