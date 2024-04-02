import React, { ReactNode, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import(/* webpackChunkName: "index" */ 'src/views/home/Home.tsx'))

const Launchpad = React.lazy(() => import(/* webpackChunkName: "launchpad" */ 'src/views/launchpad/Index.tsx'))
const LaunchpadIndex = React.lazy(() => import(/* webpackChunkName: "launchpad" */ 'src/views/launchpad/Launchpad.tsx'))

const Private = React.lazy(() => import(/* webpackChunkName: "private" */ 'src/views/fund/Private.tsx'))
const Rewards = React.lazy(() => import(/* webpackChunkName: "rewards" */ 'src/views/rewards/Rewards.tsx'))
const History = React.lazy(() => import(/* webpackChunkName: "history" */ 'src/views/history/History.tsx'))
const Staking = React.lazy(() => import(/* webpackChunkName: "staking" */ 'src/views/staking/Staking.tsx'))
const Media = React.lazy(() => import(/* webpackChunkName: "media" */ 'src/views/media/Media.tsx'))
const ApplyIndex = React.lazy(() => import(/* webpackChunkName: "apply" */ 'src/views/apply/Index.tsx'))
const Apply = React.lazy(() => import(/* webpackChunkName: "apply" */ 'src/views/apply/Apply.tsx'))
const Complete = React.lazy(() => import(/* webpackChunkName: "apply" */ 'src/views/apply/Complete.tsx'))
const Privacy = React.lazy(() => import(/* webpackChunkName: "doc" */ 'src/views/doc/Privacy.tsx'))
const Service = React.lazy(() => import(/* webpackChunkName: "doc" */ 'src/views/doc/Service.tsx'))

export interface RouterT {
  name?: string
  auth?: boolean
  path: string
  children?: Array<RouterT>
  component: any
  keepAlive?: boolean
  navigator?: string
  id?: string
}

export const routesD: RouterT[] = [
  {
    name: 'HOME',
    path: '/',
    component: <Home/>,
  },
  {
    name: 'Launchpad',
    path: '/launchpad',
    component: <Launchpad />,
    children: [
      {
        name: 'LaunchpadIndex',
        path: '/launchpad/index',
        component: <LaunchpadIndex />,
      }
    ]
  },
  {
    name: 'Fund',
    path: '/fund/:id',
    component: <Private />
  },
  {
    name: 'Rewards',
    path: '/rewards',
    component: <Rewards />
  },
  {
    name: 'History',
    path: '/history',
    component: <History />
  },
  {
    name: 'Staking',
    path: '/staking',
    component: <Staking />
  },
  {
    name: 'Media',
    path: '/media',
    component: <Media />
  },
  {
    name: 'Apply',
    path: '/apply',
    component: <Apply />
  },
  {
    name: 'apply',
    path: '/apply',
    component: <ApplyIndex />,
    children: [
      {
        name: 'ApplyIndex',
        path: '/apply/index',
        component: <Apply />,
      },
      {
        name: 'Complete',
        path: '/apply/complete',
        component: <Complete />,
      }
    ]
  },
  {
    name: 'Privacy',
    path: '/doc/privacy',
    component: <Privacy />
  },
  {
    name: 'Service',
    path: '/doc/service',
    component: <Service />
  }
]

export default function Router() {
  const RouteMap = (route: RouterT[]): ReactNode =>
    // return <Redirect to={"/"}></Redirect>

    route.map((item: RouterT) => (
      <Route
        element={item.component}
        path={item.path}
        key={item.path}>
        {item.children && RouteMap(item.children)}
      </Route>
    ))
  return (
    <Suspense fallback={null}>
      <Routes>{RouteMap(routesD)}</Routes>
    </Suspense>
  )
}
