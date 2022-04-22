import request from '@/utlis/request'

// 设备列表
// 1无人机 2生命体征传感器 3便携式环境监测仪 4单兵设备
export function getDevice(data) {
  return request({
    url: '/device/getDevice',
    method: 'post',
    data
  })
}

// 设备新增
export function insertDevice(data) {
  return request({
    url: '/device/insertDevice',
    method: 'post',
    data
  })
}

// 设备编辑
export function updateDevice(data) {
  return request({
    url: '/device/updateDevice',
    method: 'post',
    data
  })
}

// 设备删除 / 批量删除
export function deleteDevice(params) {
  return request({
    url: '/device/deleteDevice',
    method: 'get',
    params
  })
}

// 根据单位和部门查询用户列表
export function getUserListAll(params) {
  return request({
    url: '/user/getUserListAll',
    method: 'get',
    params
  })
}