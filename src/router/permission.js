import router from './index'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getUserName } from '@/utlis/auth'


NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let hasToken = store.state.user.token
  if (to.path === '/login') {
    next()
    NProgress.done()
  } else {
    if (hasToken) {
      // await store.dispatch('permission/generateRoutes')

      // await store.dispatch('user/getInfo')
      //  console.warn(store.state);
      await store.dispatch('permission/getPermRoutes', { loginNumber: getUserName() })
      next({ to, replace: true })


      NProgress.done()
    }
    else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})