import request from '@/utlis/request'
// 查询预警值
export function getvalue(data) {
  return request({
    url: '/value/getvalue',
    method: 'post',
    data
  })
}

// 修改预警值
export function updatevalue(data) {
  return request({
    url: '/value/updatevalue',
    method: 'post',
    data
  })
}

// 获取实时数据 （环境综合风险评价）
export function getEnData(params) {
  return request({
    url: '/environment/getEnData',
    method: 'post',
    params
  })
}

// 告警管理项目下拉选择
export function getProjectEnviron(params) {
  return request({
    url: '/control/getProjectEnviron',
    method: 'get',
    params
  })
}

// 电子围栏越界
export function getCrossPage(params) {
  return request({
    url: '/electronicFence/getCrossPage',
    method: 'get',
    params
  })
}

// 电子围栏违规
export function getMonitorPage(params) {
  return request({
    url: '/electronicFence/getMonitorPage',
    method: 'get',
    params
  })
}



// 告警图片
export function selectStUploadFileList(data) {
  return request({
    url: '/device/selectStUploadFileList',
    method: 'post',
    data
  })
}

// 环境告警（普通）white
export function getEnAlarmOrdinary(params) {
  return request({
    url: '/environment/getEnAlarmOrdinary',
    method: 'get',
    params
  })
}

// 环境告警（一般）yellow
export function getEnAlarmCommonly(params) {
  return request({
    url: '/environment/getEnAlarmCommonly',
    method: 'get',
    params
  })
}

// 环境告警（严重）red
export function getEnAlarmSerious(params) {
  return request({
    url: '/environment/getEnAlarmSerious',
    method: 'get',
    params
  })
}

// 生命体征告警（普通）
export function getBraceletAlarmOrdinary(params) {
  return request({
    url: '/services/getBraceletAlarmOrdinary',
    method: 'get',
    params
  })
}

// 生命体征告警（一般）
export function getBraceletAlarmCommonly(params) {
  return request({
    url: '/services/getBraceletAlarmCommonly',
    method: 'get',
    params
  })
}



// 生命体征告警（严重）
export function getBraceletAlarmSerious(params) {
  return request({
    url: '/services/getBraceletAlarmSerious',
    method: 'get',
    params
  })
}
