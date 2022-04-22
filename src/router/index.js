import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'

import Layout from '@/layout'
import AppMain from '@/layout/components/AppMain'

// 数据驾驶舱
const DataCockpit = () => import(/* webpackChunkName: "DataCockpit" */ '../views/dataCockpit')

// 生产计划管控
const ProdPlan = () => import(/* webpackChunkName: "ProdPlan" */ '../views/prodPlan')

// 视频监管
const OnsiteMonitor = () => import(/* webpackChunkName: "OnsiteMonitor" */ '../views/onsiteWork/onsiteMonitor')
const DroneMonitor = () => import(/* webpackChunkName: "DroneMonitor" */ '../views/onsiteWork/droneMonitor')
const VideoPlayback = () => import(/* webpackChunkName: "VideoPlayback" */ '../views/onsiteWork/videoPlayback')

// 系统管理
const UserMange = () => import(/* webpackChunkName: "UserMange" */ '../views/sysMange/userMange')
const RoleMange = () => import(/* webpackChunkName: "RoleMange" */ '../views/sysMange/roleMange')
const MenuMange = () => import(/* webpackChunkName: "MenuMange" */ '../views/sysMange/menuMange')
const LogMange = () => import(/* webpackChunkName: "LogMange" */ '../views/sysMange/logMange')
const DataLog = () => import(/* webpackChunkName: "DataLog" */ '../views/sysMange/dataLog')
const OrganMange = () => import(/* webpackChunkName: "OrganMange" */ '../views/sysMange/organMange')
const DeptMange = () => import(/* webpackChunkName: "DeptMange" */ '../views/sysMange/deptMange')

// 设备管理
const Drone = () => import(/* webpackChunkName: "Drone" */ '../views/deviceMange/drone')
const VitalSignsSensor = () => import(/* webpackChunkName: "VitalSignsSensor" */ '../views/deviceMange/vitalSignsSensor')
const PorEnvMonDevice = () => import(/* webpackChunkName: "PorEnvMonDevice" */ '../views/deviceMange/porEnvMonDevice')
const SinglemanDevice = () => import(/* webpackChunkName: "SinglemanDevice" */ '../views/deviceMange/singlemanDevice')
const ElectronFence = () => import(/* webpackChunkName: "ElectronFence" */ '../views/deviceMange/electronFence')



// 告警管理
const WarnMange = () => import(/* webpackChunkName: "WarnMange" */ '../views/warnMange')


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/views',
    component: Layout,
    redirect: '/views/dataCockpit',
    children: [
      { path: '/views/dataCockpit', component: DataCockpit, meta: { title: '数据驾驶舱', activeMenu: '/views/dataCockpit' } },
      { path: '/views/prodPlan', component: ProdPlan, meta: { title: '生产计划管控', activeMenu: '/views/prodPlan' } },
      {
        path: '/views/onsiteWork',
        redirect: '/views/onsiteWork/onsiteMonitor',
        component: AppMain,
        meta: { title: '视频监管', activeMenu: '/views/onsiteWork' },
        children: [
          { path: 'onsiteMonitor', component: OnsiteMonitor, meta: { title: '现场监控', activeMenu: '/views/onsiteWork' } },
          { path: 'droneMonitor', component: DroneMonitor, meta: { title: '无人机监控', activeMenu: '/views/onsiteWork' } },
          // { path: 'videoPlayback', component: VideoPlayback, meta: { title: '录像回放', activeMenu: '/views/onsiteWork' } }
        ]
      },
      {
        path: '/views/sysMange',
        redirect: '/views/sysMange/userMange',
        component: AppMain,
        meta: { title: '系统管理', activeMenu: '/views/sysMange' },
        children:
          [
            { path: 'userMange', component: UserMange, meta: { title: '用户管理', activeMenu: '/views/sysMange' } },
            { path: 'roleMange', component: RoleMange, meta: { title: '角色管理', activeMenu: '/views/sysMange' } },
            // { path: 'menuMange', component: MenuMange, meta: { title: '菜单管理', activeMenu: '/views/sysMange' } },
            // { path: 'logMange', component: LogMange, meta: { title: '日志管理', activeMenu: '/views/sysMange' } },
            // { path: 'dataLog', component: DataLog, meta: { title: ' 数据日志', activeMenu: '/views/sysMange' } },
            { path: 'organMange', component: OrganMange, meta: { title: ' 单位管理', activeMenu: '/views/sysMange' } },
            { path: 'deptMange', component: DeptMange, meta: { title: '部门管理', activeMenu: '/views/sysMange' } },

          ]
      },
      {
        path: '/views/deviceMange',
        redirect: '/views/deviceMange/drone',
        component: AppMain,
        meta: { title: '设备管理', activeMenu: '/views/deviceMange' },
        children: [
          { path: 'drone', component: Drone, meta: { title: '无人机', activeMenu: '/views/deviceMange' } },
          { path: 'vitalSignsSensor', component: VitalSignsSensor, meta: { title: '生命体征传感器', activeMenu: '/views/deviceMange' } },
          { path: 'porEnvMonDevice', component: PorEnvMonDevice, meta: { title: '便携式环境监测设备', activeMenu: '/views/deviceMange' } },
          { path: 'singlemanDevice', component: SinglemanDevice, meta: { title: '单兵设备', activeMenu: '/views/deviceMange' } },
          { path: 'electronFence', component: ElectronFence, meta: { title: '电子围栏', activeMenu: '/views/electronFence' } },

        ]
      },
      { path: '/views/warnMange', component: WarnMange, meta: { title: '告警管理', activeMenu: '/views/warnMange' } },
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
