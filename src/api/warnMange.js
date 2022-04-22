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
