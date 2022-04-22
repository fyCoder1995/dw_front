import router from './index'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let hasToken = store.state.user.token
  if (to.path === '/login') {
    next()
    NProgress.done()
  } else {
    if (hasToken) {
      await store.dispatch('permission/generateRoutes')
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