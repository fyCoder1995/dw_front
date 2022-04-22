import request from '@/utlis/request'

// 工程列表 分页
export function getProjectListPage(data) {
  return request({
    url: '/control/getProjectListPage',
    method: 'post',
    data
  })
}

// 工程新增 -
export function insertProject(data) {
  return request({
    url: '/control/insertProject',
    method: 'post',
    data
  })
}

// 项目导出
export function outputRightProtectionData() {
  return request({
    headers: { 'Content-Type': 'application/octet-stream;charset=UTF-8' },
    responseType: 'blob',
    url: '/control/outputRightProtectionData',
    method: 'get'
  })
}

// 项目导入
export function insertProjectData(data) {
  return request({
    url: '/control/insertProjectData',
    method: 'post',
    data
  })
}

// 工程详情
export function getProject(params) {
  return request({
    url: '/control/getProject',
    method: 'get',
    params
  })
}