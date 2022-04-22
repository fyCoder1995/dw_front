import request from '@/utlis/request'

// 视频监管
// 无人机监控树
export function getDeviceTree(params) {
  return request({
    url: '/device/getDeviceTree',
    method: 'get',
    params
  })
}