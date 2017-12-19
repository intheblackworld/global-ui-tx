import { Home, Mmc, Tx3D } from '../containers'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: '首页',
  },
  {
    path: '/mmc',
    component: Mmc,
    exact: true,
    title: '腾讯分分彩',
  },
  {
    path: '/3d',
    component: Tx3D,
    exact: true,
    title: '腾讯3D',
  },
]

export default routes
