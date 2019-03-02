import Layout from '../components/Layout';
import Landing from './Landing';

export default [
  {
    component: Layout,
    routes: [
      {
        path: "/",
        component: Landing,
      },
    ]
  }
];