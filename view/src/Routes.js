import Account from './components/account';
import Projects from './components/projects';

const routes = [
  {
    path: '/projects',
    component: Projects,
  },
  {
    path: '/',
    component: Account,
  },
];

export default routes;