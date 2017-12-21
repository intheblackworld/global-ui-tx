import { Home, Ffc, Ffc3d } from '../containers'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: '首页',
  },
  {
    path: '/ffc',
    component: Ffc,
    exact: true,
    title: '腾讯分分彩',
  },
  {
    path: '/3d',
    component: Ffc3d,
    exact: true,
    title: '腾讯3D',
  },
]

export default routes
