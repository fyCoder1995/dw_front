import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_APIHOST,
  timeout: 0
})

service.interceptors.request.use(config => {
  if (config.url === '/oauth/token') {
    config.headers.Authorization = 'Basic eGhnYToxMjM0NTY='
  } else {
    config.headers.Authorization = 'bearer ' + getToken()
  }
  return config
},
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  }, error => {
    if (error) {
      Message.error({ message: error.message })
    } else {
      Message.error({ message: '连接服务器失败' })
    }
    return Promise.reject(error)
  }
)

export default service